import { ru } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import { createAutoHeightTextareaPlugin  } from '@formkit/addons'
import { createThemePlugin } from '@formkit/themes'
import { createProPlugin, taglist } from '@formkit/pro'
import '@formkit/addons/css/floatingLabels'
import '@formkit/themes/genesis'
import '@formkit/pro/genesis'

const proPlugin = createProPlugin('fk-43c2cf901a', {
  taglist
})

const config = defaultConfig({
  locales: { ru },
  locale: 'ru',
  plugins: [
    createThemePlugin('genesis'),
    createAutoHeightTextareaPlugin(),
    proPlugin
  ]
})

export default config