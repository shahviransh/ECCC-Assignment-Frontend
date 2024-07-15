<template>
  <div id="app">
    <select
      v-model="selectedID"
      style="width: 200px; margin-bottom: 20px;"
      placeholder="Select ID"
      @change="fetchData"
    >
      <option v-for="id in ids" :key="id" :value="id">{{ id }}</option>
    </select>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, onMounted } from 'vue';

use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
]);

provide(THEME_KEY, 'dark');

const ids = ref([]);
const selectedID = ref(null);
const option = ref({
  title: {
    text: 'Runoff Data',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{a} <br/>{b} : {c}',
  },
  grid: { top: 8, right: 8, bottom: 24, left: 36 },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true,
    },
  ],
});

const fetchIDs = () => {
  fetch('http://127.0.0.1:5000/ids')
    .then(response => response.json())
    .then(data => {
      for (const id of data) {
        ids.value.push(id);
      }
    });
};

const fetchData = () => {
  if (selectedID.value !== null && selectedID.value !== undefined) {
    fetch(`http://127.0.0.1:5000/data?id=${selectedID.value}`)
      .then(response => response.json())
      .then(data => {
        option.value.xAxis.data = data.time;
        option.value.series[0].data = data.runoff;
      });
  }
};

onMounted(() => {
  fetchIDs();
});
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1f1f1f; /* Dark background color */
  color: #fff; /* Light text color */
}

.custom-select {
  width: 200px;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #333; /* Dark background color */
  color: #fff; /* Light text color */
}

.custom-select option {
  background-color: #333; /* Dark background color */
  color: #fff; /* Light text color */
}

.chart {
  width: 80%; /* Adjust as needed */
  max-width: 800px; /* Adjust as needed */
  height: 60vh;
  margin-top: 20px;
}
</style>
