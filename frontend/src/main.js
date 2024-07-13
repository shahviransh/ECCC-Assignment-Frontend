import './assets/main.css'
import App from './App.vue'
import Vue from 'vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import ECharts from 'vue-echarts';
import 'echarts';

Vue.use(ViewUI);
Vue.component('v-chart', ECharts);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
