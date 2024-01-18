import { createApp } from 'vue';
import App from './App';
import components from "@/components/UI"
import directives from '@/directives/index.js';
import { Icon } from '@iconify/vue';
import router from '@/router/router.js';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { plugin } from '@formkit/vue'
import formKitConfig from '../formkit.config.js';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

components.forEach(component => {
    app.component(component.name, component)
})

app
    .component('Icon', Icon)
    .component('QuillEditor', QuillEditor)
    .use(router)
    .use(plugin, formKitConfig)
    .use(pinia)
    .mount('#app');
