<template>
    <v-row no-gutters fill-height>
        <v-col sm="4">
            <MDViewer :md-text="theory"></MDViewer>
        </v-col>
        <v-col sm="4" fill-height>
            <Editor v-model="testCode"></Editor>
        </v-col>
        <LogDisplay :logs="logs"></LogDisplay>
    </v-row>
</template>

<script>
    import MDViewer from './MDViewer';
    import Editor from './Editor';
    import 'zone.js';
    import 'zone.js/lib/zone-spec/async-test';
    import store from "../store";
    import LogDisplay from "./LogDisplay";

    export default {
        name: 'Main',

        data: function () {
            return {
                testZone: null,
                logs: [],
                originalConsoleLog: null,
                testCode: '',
                theory: '',

                books: store.getBooks(),
                book: null,

                chapters: [],
                chapter: null,

                tasks: [],
                task: null,

                output: '',

                running: false,
            };
        },

        components: {
            LogDisplay,
            MDViewer,
            Editor,
        },

        methods: {
            run(callback) {
                if (this.running) {
                    return;
                }
                this.output = '';
                this.logs = [];
                this.running = true;
                const func = new Function(this.testCode);

                const zoneSpec = new window.Zone['AsyncTestZoneSpec'](this.getSuccessCallback(callback),
                    this.getFailCallback());
                this.testZone = new window.Zone(window.Zone.current, zoneSpec);
                this.testZone.runGuarded(func);
            },

            getSuccessCallback(callback) {
                return () => {
                    const wasRunning = this.running; //callback always fire twice :(
                    this.running = false;
                    if (callback && wasRunning) {
                        callback();
                    }
                };
            },

            getFailCallback() {
                return (error) => {
                    this.running = false;
                    this.displayError(error);
                };
            },

            loadBook() {
                this.book = this.findOrFirst(this.books, 'book');
                if (this.book) {
                    this.chapters = this.book.getChapters();
                    this.loadChapter();
                }
            },

            loadChapter() {
                this.chapter = this.findOrFirst(this.chapters, 'chapter');
                if (this.chapter) {
                    this.theory = this.chapter.getTheory();
                    this.tasks = this.chapter.getTasks();
                    this.loadTask();
                }
            },

            loadTask() {
                if (this.$route.params.task) {
                    this.task = this.tasks.find((task) => {
                        return task.getSlug() === this.$route.params.task;
                    });

                    if (this.task) {
                        this.theory = this.task.getDescription();
                        const savedCode = store.restoreCode(this.book, this.chapter, this.task);
                        if (savedCode) {
                            this.testCode = savedCode;
                        } else {
                            this.testCode = this.task.getStartCode();
                        }
                    }
                } else if (this.chapter) {
                    this.theory = this.chapter.getTheory();
                }
            },

            findOrFirst(list, routeKey) {
                let selected;

                if (this.$route.params[routeKey]) {
                    selected = list.find((item) => {
                        return item.getSlug() === this.$route.params[routeKey];
                    });
                }

                if (!selected && list.length > 0) {
                    selected = list[0];
                }

                return selected;
            },

            test() {
                this.run(() => {
                    try {
                        this.task.validate(this.output);
                        this.displaySuccessMessage(this.$t('Tests passed'));
                        store.markDone(this.book, this.chapter, this.task);
                    } catch (e) {
                        this.displayError(e);
                    }
                });
            },

            displayError(error) {
                this.logs.push({type: 'error', message: error, color: 'red'});
            },

            displaySuccessMessage(message) {
                this.logs.push({type: 'success', message, color: 'green'});
            },

            monkeyPatchConsole() {
                this.originalConsoleLog = console.log;
                console.log = (message, ...optionalParams) => { //Monkey patch console log
                    if (window.Zone.current === this.testZone) {
                        this.logs.push({type: 'log', message});
                        this.output += message + '\n';
                    } else {
                        this.originalConsoleLog(message, ...optionalParams);
                    }
                };
            },

            subscribeToGlobalEvents() {
                store.onRunCode(this.run);
                store.onTestCode(this.test);
            },
        },

        mounted() {
            this.monkeyPatchConsole();
            this.subscribeToGlobalEvents();
            this.loadBook();
        },

        destroyed() {
            if (this.originalConsoleLog) {
                console.log = this.originalConsoleLog;
            }

            store.offRunCode(this.run);
            store.offTestCode(this.test);
        },

        watch: {
            $route() {
                this.loadBook();
            },

            testCode(newCode) {
                store.saveCode(this.book, this.chapter, this.task, newCode)
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
