import { createApp } from 'vue';
import App from './App.vue';
import ViewUIPlus from 'view-ui-plus';
import './index.css'; // Import Tailwind CSS

const app = createApp(App);

app.use(ViewUIPlus).mount('#app');