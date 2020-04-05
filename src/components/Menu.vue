<template>
    <v-list dense>
        <v-list>

            <v-list-group link v-for="(book, key) in books" :key="key"
                          value="true">
                <template v-slot:activator>
                    <v-list-item-title>{{ book.getName() }}</v-list-item-title>
                </template>

                <v-list-group no-action
                              sub-group
                              value="true"
                              link v-for="(chapter, chapterKey) in book.getChapters()" v-bind:key="chapterKey">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>{{ chapter.getName() }}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item link>
                        <v-list-item-title v-text="'Theory'"></v-list-item-title>
                    </v-list-item>

                    <v-list-item v-for="(task, taskKey) in chapter.getTasks()"
                                 :key="taskKey"
                                 link>
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
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
