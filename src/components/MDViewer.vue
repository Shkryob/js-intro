<template>
    <div v-html="render()" class="theory-view mt-1 pr-2 line-numbers copy-to-clipboard" ref="view"></div>
</template>

<script>
    import MarkdownIt from 'markdown-it';
    import prism from 'prismjs';
    import 'clipboard';
    import 'prismjs/plugins/toolbar/prism-toolbar';
    import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
    import 'prismjs/plugins/line-numbers/prism-line-numbers';

    export default {
        name: 'MDViewer',

        props: ['mdText'],

        methods: {
            highlight(code) {
                if (code.highlighted) {
                    return;
                }
                prism.highlightElement(code);
                code.highlighted = true;
            },

            render() {
                const md = new MarkdownIt({html: true});
                setTimeout(() => {
                    for (const code of this.$refs.view.getElementsByTagName('code')) {
                        this.highlight(code);
                    }
                });
                return md.render(this.mdText);
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "~prism-themes/themes/prism-darcula.css";
    @import "~prismjs/plugins/toolbar/prism-toolbar.css";
    @import "~prismjs/plugins/line-numbers/prism-line-numbers.css";

    .theory-view {
        height: 100%;
        overflow: auto;

        pre.line-numbers {
            background: none;
            padding: 0 0 0 25px;

            code {
                min-height: 100%;
                min-width: 100%;
            }

            overflow: visible;
            margin-bottom: -21px;
        }

        .code-toolbar {
            overflow-x: auto;
            overflow-y: hidden;
            margin-bottom: 20px;
        }

        code {
            padding-left: 10px;
            border-radius: 0;
            background-color: rgb(43, 43, 43);
            border: none;
            box-shadow: none;

            .token {
                &.function {
                    color: #a9b7c6;
                }

                &.comment {
                    color: #61A151;
                    font-style: italic;
                }
            }

            .line-numbers-rows {
                left: -2.6em;
                border-right: none;
                background: #313335;
            }
        }

        code::before {
            content: none;
        }

        code::after {
            content: none;
        }

        :not(pre) > code[class*="language-"] {
            border-radius: 0;
            padding: 0.1em 0.3em;
        }
    }
</style>
