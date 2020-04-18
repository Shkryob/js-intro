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
    import ValidationException from "../exceptions/ValidationException";

    export default {
        name: 'LogDisplay',
        components: {Diff},
        props: ['logs'],

        methods: {
            formatMessage(log) {
                if (log.message instanceof ValidationException) {
                    return this.$t(log.message.getMessage(), log.message.getMessageArgs());
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
