import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { ThemeDefinition, createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#4563EE',
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
    theme: {
      defaultTheme: 'lightTheme',
      themes: {
        lightTheme
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
