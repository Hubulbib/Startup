import { createApp } from 'vue';
import App from './App';
import components from "@/components/UI"
// import PerfectScrollbar from 'vue3-perfect-scrollbar'
// import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import directives from '@/directives/index.js';
import { Icon } from '@iconify/vue';
// import router from '@/router/router.js';

const app = createApp(App);

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

components.forEach(component => {
    app.component(component.name, component)
})

app
    .component('Icon', Icon)
    // .use(PerfectScrollbar)
    // .use(router)
    .mount('#app');