<template>
    <div ref='editor' class="code-editor"></div>
</template>

<script>
    import CodeMirror from 'codemirror';
    import 'codemirror/addon/mode/overlay';
    import 'codemirror/mode/xml/xml';
    import 'codemirror/mode/htmlmixed/htmlmixed';
    import 'codemirror/mode/javascript/javascript';
    import 'codemirror/addon/mode/simple';

    export default {
        name: 'Editor',

        props: ['value'],

        data: function () {
            return {
                codeMirror: null,
            };
        },

        mounted() {
            this.createEditorInstance();
        },

        methods: {
            createEditorInstance() {
                if (this.codeMirror) {
                    this.codeMirror.destroy();
                }

                this.codeMirror = new CodeMirror(this.$refs['editor'], {
                    value: this.value,
                    mode:  'javascript',
                    theme: 'darcula',
                    gutters: ['CodeMirror-linenumbers'],
                    lineNumbers: true,
                    foldGutter: true,
                });
                this.codeMirror.on('change', editor => {
                    this.$emit('input', editor.getValue())
                });
            },
        },

        watch: {
            value(newVal) {
                if (this.codeMirror && this.codeMirror.getDoc().getValue() !== newVal) {
                    this.codeMirror.getDoc().setValue(newVal);
                }
            }
        }
    }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss'>
    @import '~codemirror/lib/codemirror';
    @import '~codemirror/theme/darcula';

    .code-editor {
        height: 100%;
        .CodeMirror {
            height: 100%;
        }
    }
</style>
