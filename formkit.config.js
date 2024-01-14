import { ru } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import { createFloatingLabelsPlugin } from '@formkit/addons'
import { rootClasses } from './formkit.theme.mjs'
import { createThemePlugin } from '@formkit/themes'
import '@formkit/addons/css/floatingLabels'
import '@formkit/themes/genesis'

const config = defaultConfig({
  locales: { ru },
  locale: 'ru',
//   config: {
//     rootClasses
//   },
  plugins: [
    createFloatingLabelsPlugin({
        useAsDefault: false
    }),
    createThemePlugin('genesis')
  ]
})

export default config