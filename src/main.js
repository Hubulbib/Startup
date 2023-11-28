import { createApp } from 'vue';
import App from './App';
import components from "@/components/UI"
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(PerfectScrollbar)
    .mount('#app');