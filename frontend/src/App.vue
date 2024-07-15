<template>
  <div id="app">
    <SelectID @idSelected="fetchData" :ids="ids" />
    <ChartDisplay :option="option" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SelectID from './components/SelectID.vue';
import ChartDisplay from './components/ChartDisplay.vue';

const ids = ref([]);
const option = ref({
  title: {
    text: 'Rivers Runoff Data',
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
      ids.value = data;
    });
};

const fetchData = (selectedID) => {
  if (selectedID !== null && selectedID !== undefined) {
    fetch(`http://127.0.0.1:5000/data?id=${selectedID}`)
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
</style>