<template>
    <v-col sm="4" class="pa-1 log-display">
        <v-alert v-for="(log, index) in logs"
                 :key="index"
                 :color="log.color"
                 outlined
                 dense>
            <pre>{{ formatMessage(log) }}</pre>
            <Diff v-if="log.message.showDiff"
                  :actual="log.message.actual"
                  :expected="log.message.expected"></Diff>
        </v-alert>
    </v-col>
</template>

<script>
    import Diff from './Diff';

    export default {
        name: 'LogDisplay',
        components: {Diff},
        props: ['logs'],

        methods: {
            formatMessage(log) {
                if (log.message.name === 'AssertionError' && log.message.showDiff) {
                    const message = this.$t('Incorrect output');
                    return message;
                } else {
                    return log.message;
                }
            }
        },
    }
</script>

<style lang="scss">
    .log-display {
        max-height: 100%;
        overflow-y: auto;
    }
</style>
