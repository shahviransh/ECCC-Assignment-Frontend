import { createApp } from 'vue';
import App from './App.vue';
import ViewUIPlus from 'view-ui-plus';
import 'view-design/dist/styles/iview.css';

const app = createApp(App);

app.use(ViewUIPlus).mount('#app');
