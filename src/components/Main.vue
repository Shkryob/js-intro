<template>
    <v-row no-gutters fill-height>
        <v-col sm="4">
            <MDViewer :md-text="theory"></MDViewer>
        </v-col>
        <v-col sm="4" fill-height>
            <Editor v-model="testCode"></Editor>
        </v-col>
        <v-col sm="4" class="pa-1">
            <v-alert v-for="(message, index) in messages"
                     :key="index"
                     :color="message.color"
                     outlined
                     dense>
                {{message.message}}
            </v-alert>
        </v-col>
    </v-row>
</template>

<script>
    import MDViewer from './MDViewer';
    import Editor from './Editor';
    import 'zone.js';
    import 'zone.js/lib/zone-spec/async-test';
    import store from "../store";

    export default {
        name: 'Main',

        data: function () {
            return {
                testZone: null,
                messages: [],
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
            MDViewer,
            Editor,
        },

        methods: {
            run(callback) {
                if (this.running) {
                    return;
                }
                this.output = '';
                this.messages = [];
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
                this.book = this.books[0];
                this.chapters = this.book.getChapters();

                this.loadChapter();
            },

            loadChapter() {
                const chapter = this.chapters[0];
                this.theory = chapter.getTheory();
                this.tasks = chapter.getTasks();

                this.loadTask();
            },

            loadTask() {
                this.task = this.tasks[0];
                this.theory = this.task.getDescription();
                this.testCode = this.task.getStartCode();
            },

            test() {
                this.run(() => {
                    try {
                        this.task.validate(this.output);
                        this.displaySuccessMessage('Tests passed');
                    } catch (e) {
                        this.displayError(e);
                    }
                });
            },

            displayError(error) {
                this.messages.push({type: 'error', message: error, color: 'red'});
            },

            displaySuccessMessage(message) {
                this.messages.push({type: 'success', message, color: 'green'});
            },

            monkeyPatchConsole() {
                this.originalConsoleLog = console.log;
                console.log = (message, ...optionalParams) => { //Monkey patch console log
                    if (window.Zone.current === this.testZone) {
                        this.messages.push({type: 'log', message});
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
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
