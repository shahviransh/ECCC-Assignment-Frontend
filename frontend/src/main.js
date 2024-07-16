// Import necessary modules and styles
import { createApp } from 'vue'
import App from './App.vue'
import ViewUIPlus from 'view-ui-plus'
import './index.css' // Import Tailwind CSS
import 'view-ui-plus/dist/styles/viewuiplus.css' // Import ViewUI CSS

// Create and mount the Vue application
const app = createApp(App)
app.use(ViewUIPlus).mount('#app')
