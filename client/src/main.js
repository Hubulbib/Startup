import { createApp } from 'vue';
import App from './App';
import '@/assets/scss/main.scss';
import components from '@/components/UI';
import directives from '@/directives/index.js';
import { Icon } from '@iconify/vue';
import router from '@/router/router.js';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { plugin } from '@formkit/vue';
import formKitConfig from '../formkit.config.js';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

directives.forEach(directive => {
  app.directive(directive.name, directive);
});

components.forEach(component => {
  app.component(component.name, component);
});

app
    .component('Icon', Icon)
    .component('QuillEditor', QuillEditor)
    .use(pinia)
    .use(router)
    .use(plugin, formKitConfig)
    .mount('#app');

const debounce = (callback, delay) => {
    let tid;
    return function (...args) {
        const ctx = self;
        tid && clearTimeout(tid);
        tid = setTimeout(() => {
            callback.apply(ctx, args);
        }, delay);
    };
};

const _ = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ {
    constructor(callback) {
        callback = debounce(callback, 20);
        super(callback);
    }
};
