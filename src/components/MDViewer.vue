<template>
    <div v-html="render()" class="theory-view"></div>
</template>

<script>
    import MarkdownIt from 'markdown-it';

    export default {
        name: 'MDViewer',

        props: ['mdText'],

        methods: {
            render() {
                const md = new MarkdownIt({html: true});
                return md.render(this.mdText);
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .theory-view {
        height: 100%;
        overflow: auto;

        pre > code {
            width: 100%;
        }
    }
</style>
