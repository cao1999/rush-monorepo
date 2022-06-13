import { createApp } from 'vue'
import App from './App.vue'
import { sendTrack } from '@monorepo/track'
import { useIntl } from '@monorepo/intl'

sendTrack()

useIntl()

createApp(App).mount('#app')
