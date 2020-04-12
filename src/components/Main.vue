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
    import Sandbox from "../sandbox";

    export default {
        name: 'Main',

        data: function () {
            return {
                logs: [],
                testCode: '',
                theory: '',

                books: store.getBooks(),
                book: null,

                chapters: [],
                chapter: null,

                tasks: [],
                task: null,

                sandbox: null,
            };
        },

        components: {
            LogDisplay,
            MDViewer,
            Editor,
        },

        methods: {
            run(callback) {
                this.output = '';
                this.logs = [];

                if (this.sandbox) {
                    this.sandbox.destructor();
                }
                this.sandbox = new Sandbox(this.testCode);
                this.sandbox.run(this.getSuccessCallback(callback), this.getFailCallback(), this.getLogCallback())
            },

            getSuccessCallback(callback) {
                return () => {
                    if (typeof callback === 'function') {
                        callback();
                    }
                };
            },

            getFailCallback() {
                return (error) => {
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
                        this.task.validate(this.sandbox);
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

            getLogCallback() {
                return (message) => {
                    this.logs.push({type: 'log', message});
                };
            },

            subscribeToGlobalEvents() {
                store.onRunCode(this.run);
                store.onTestCode(this.test);
            },
        },

        mounted() {
            this.subscribeToGlobalEvents();
            this.loadBook();
        },

        destroyed() {
            if (this.sandbox) {
                this.sandbox.destructor();
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
