<template>
    <div class="locale-changer">
        <v-btn-toggle v-model="$i18n.locale"
                      dense>
            <v-btn v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</v-btn>
        </v-btn-toggle>
    </div>
</template>

<script>
    import store from "../store";

    export default {
        name: 'LocaleChanger',
        data () {
            return { langs: store.getLanguages() }
        },

        watch: {
            '$i18n.locale': function (newVal) {
                store.setLanguage(newVal);
            }
        },

        created() {
            this.$i18n.locale = store.getLanguage();
        }
    }
</script>