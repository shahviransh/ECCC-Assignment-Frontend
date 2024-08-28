<template>
  <div id="app">
    <!-- Include the SelectID and ChartDisplay components -->
    <div class="selection-container">
      <SelectID :ids="ids" @idSelected="updateSelectedID" />
      <!--- Button to fetch data based on the selected ID -->
      <button @click="fetchData" class="fetch-button">Fetch Data</button>
    </div>
    <ChartDisplay :option="option" class="chart" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SelectID from './components/SelectID.vue';
import ChartDisplay from './components/ChartDisplay.vue';

// Define reactive variables
const ids = ref([]);
const selectedID = ref(null);
// Define the chart options
const option = ref({
  title: {
    text: 'Rivers Runoff Data',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{a} <br/>{b} : {c}',
  },
  grid: { top: 8, right: 8, bottom: 40, left: 40 },
  xAxis: {
    type: 'category',
    data: [],
    name: 'Time',  // Name of the x-axis
    nameLocation: 'middle', // Position at the middle of the axis
    nameTextStyle: {
      fontSize: 14,  // Increase font size for visibility
      padding: 0,  // Increase padding for better placement
    },
    axisLabel: {
      fontSize: 12,
    },
  },
  yAxis: {
    type: 'value',
    name: 'Runoff',  // Y-axis title
    nameLocation: 'middle',
    nameTextStyle: {
      fontSize: 14,
      padding: 0,  // Adjust padding for better placement
    },
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true,
    },
  ],
});

// Function to fetch IDs from the API
const fetchIDs = () => {
  fetch('https://eccc-assignment-backend.vercel.app/ids')
    .then(response => response.json())
    .then(data => {
      ids.value = data;
    });
};

// Update the selected ID
const updateSelectedID = (id) => {
  selectedID.value = id;
};

// Update the chart data based on the selected ID
const fetchData = () => {
  if (selectedID.value !== null && selectedID.value !== undefined) {
    fetch(`https://eccc-assignment-backend.vercel.app/data?id=${selectedID.value}`)
      .then(response => response.json())
      .then(data => {
        option.value.xAxis.data = data.time;
        option.value.series[0].data = data.runoff;
      });
  }
};

// Fetch IDs when the component is mounted
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
  background-color: #1f1f1f;
  color: #fff;
}

.selection-container {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
}

.fetch-button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.fetch-button:hover {
  background-color: #0056b3;
}
</style>
