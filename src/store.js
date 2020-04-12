import Vue from 'vue';
import EloquentJSRu from './books/eloquent_js_ru/EloquentJSRu';
import LocalStorage from 'local-storage';

export default {
    eventBus: new Vue(),
    languages: ['en', 'ru'],
    books: [
        new EloquentJSRu,
    ],
    storageNamespace: 'sh-js-intro.',

    triggerRunCode() {
        this.eventBus.$emit('run-code');
    },

    triggerTestCode() {
        this.eventBus.$emit('test-code');
    },

    onRunCode(callback) {
        this.eventBus.$on('run-code', callback);
    },

    onTestCode(callback) {
        this.eventBus.$on('test-code', callback);
    },

    offRunCode(callback) {
        this.eventBus.$off('run-code', callback);
    },

    offTestCode(callback) {
        this.eventBus.$off('test-code', callback);
    },

    getBooks() {
        return this.books;
    },

    getLanguages() {
        return this.languages;
    },

    getLanguage() {
        let lang = this.get('lang');
        if (!this.languages.includes(lang)) {
            lang = this.languages[0];
        }
        return lang;
    },

    setLanguage(lang) {
        return this.store('lang', lang)
    },

    store(key, val) {
        return LocalStorage(this.storageNamespace + key, val);
    },

    get(key) {
        return LocalStorage.get(this.storageNamespace + key);
    },

    remove(key) {
        return LocalStorage.remove(this.storageNamespace + key);
    },

    createTaskKey(book, chapter, task) {
        return book.getSlug() + '_' + chapter.getSlug() + (task ? '_' + task.getSlug() : '');
    },

    saveCode(book, chapter, task, code) {
        const key = this.createTaskKey(book, chapter, task);
        return this.store(key + '_code', code);
    },

    restoreCode(book, chapter, task) {
        const key = this.createTaskKey(book, chapter, task);
        return this.get(key + '_code');
    },

    markDone(book, chapter, task) {
        const key = this.createTaskKey(book, chapter, task);
        return this.store(key + '_done', true);
    },

    isDone(book, chapter, task) {
        const key = this.createTaskKey(book, chapter, task);
        return this.get(key + '_done');
    },
}