import Vue from 'vue';
import EloquentJSRu from "./books/eloquent_js_ru/EloquentJSRu";

export default {
    eventBus: new Vue(),

    books: [
        new EloquentJSRu,
    ],

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
    }
}