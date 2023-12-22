import { createApp } from 'vue';
import App from './App';
import components from "@/components/UI"
// import PerfectScrollbar from 'vue3-perfect-scrollbar'
// import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import directives from '@/directives/index.js';
import { Icon } from '@iconify/vue';
// import router from '@/router/router.js';
import VueTippy from 'vue-tippy'
// import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App);

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

components.forEach(component => {
    app.component(component.name, component)
})

app
    .component('Icon', Icon)
    .component('QuillEditor', QuillEditor)
    // .use(PerfectScrollbar)
    // .use(router)
    .use(
        VueTippy,
        // optional
        {
          directive: 'tippy', // => v-tippy
          component: 'tippy', // => <tippy/>
          componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
          defaultProps: {
            placement: 'auto-end',
            allowHTML: true,
          }, // => Global default options * see all props
        }
      )
    .mount('#app');