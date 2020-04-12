<template>
    <v-list dense id="left_menu">
        <v-list>
            <v-list-group link
                          v-for="(book, key) in books"
                          :key="key"
                          value="true">
                <template v-slot:activator>
                    <v-list-item-title>{{ book.getName() }}</v-list-item-title>
                </template>

                <v-list-group no-action
                              sub-group
                              value="true"
                              v-for="(chapter, chapterKey) in book.getChapters()"
                              :key="chapterKey">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>{{ chapter.getName() }}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item link :to="buildLink(book, chapter)" exact>
                        <v-list-item-title v-text="$t('Theory')"></v-list-item-title>
                    </v-list-item>

                    <v-list-item v-for="(task, taskKey) in chapter.getTasks()"
                                 :key="taskKey"
                                 :to="buildLink(book, chapter, task)"
                                 link>
                        <v-list-item-icon v-if="isDone(book, chapter, task)">
                            <v-icon dark color="green">mdi-check</v-icon>
                        </v-list-item-icon>

                        <v-list-item-title v-text="task.getTitle()"></v-list-item-title>
                    </v-list-item>
                </v-list-group>
            </v-list-group>
        </v-list>
    </v-list>
</template>

<script>
    import store from "../store";

    export default {
        name: 'Menu',

        data: function () {
            return {
                books: store.getBooks(),
            };
        },

        methods: {
            buildLink(...args) {
                return '/' + args.map((obj) => {
                    return obj.getSlug()
                }).join('/');
            },

            isDone(book, chapter, task) {
                return store.isDone(book, chapter, task)
            },
        }
    }
</script>

<style lang='scss'>
    #left_menu {
        .v-list-item__icon {
            margin-right: 0;
        }

        .v-list-item {
            padding-left: 25px;
        }

        .v-list-group .v-list-group__header {
            padding-left: 7px;
        }

        .v-list-group__items .v-list-group .v-list-group__header {
            padding-left: 0;
        }

        &.v-list--dense .v-list-item {
            min-height: 30px;

            .v-list-item__icon {
                height: 14px;
            }
        }
    }
</style>