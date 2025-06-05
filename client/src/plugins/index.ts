/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import auth0 from './auth0'
import pinia from '../stores'
import router from '../router'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  console.log(
    'auth0 vite settings',
    import.meta.env.VITE_AUTH0_DOMAIN,
    import.meta.env.VITE_AUTH0_CLIENT_ID,
    window.location.origin
  )
  app.use(vuetify).use(router).use(pinia).use(auth0)
}
