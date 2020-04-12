<template>
    <div >
        <div v-for="(part, key) in diff"
             :key="key"
             :style="{color: getColor(part)}"
             class="diff-part">{{ part.value }}</div>
    </div>
</template>

<script>
    import { diffLines } from 'diff';

    export default {
        name: 'Diff',
        props: ['expected', 'actual'],

        data: function() {
            return {
                diff: [],
            }
        },

        methods: {
            generateDiff() {
                if (typeof this.expected !== 'string' || typeof this.actual !== 'string') {
                    this.diff = [];
                    return;
                }

                this.diff = diffLines(this.normalizeText(this.expected), this.normalizeText(this.actual));
            },

            getColor(part) {
                return part.added ? 'green' :
                    part.removed ? 'red' : 'grey';
            },

            normalizeText(text) {
                return text.replace(/\r?\n|\r/g, '\n')
                    .replace('\\n', '\n')
                    .replace(/(\n)?$/g, '\n');
            }
        },

        watch: {
            expected() {
                this.generateDiff();
            },

            actual() {
                this.generateDiff();
            },
        },

        created() {
            this.generateDiff();
        }
    }
</script>

<style lang="scss">
    .diff-part {
        white-space: pre;
    }
</style>
