import { createApp } from 'vue';
import App from './App.vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';

const app = createApp(App);

app.use(ViewUI);
app.component('v-chart', ECharts);

app.mount('#app');
