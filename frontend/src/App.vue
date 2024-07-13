<template>
  <div>
    <Select v-model="selectedId" @on-change="fetchData">
      <Option v-for="id in ids" :key="id" :value="id">{{ id }}</Option>
    </Select>
    <v-chart :option="chartOption" style="width: 100%; height: 400px;"></v-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedId: null,
      ids: [],
      chartOption: {
        title: {
          text: 'Runoff Data',
        },
        tooltip: {
          trigger: 'axis',
        },
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
          },
        ],
      },
    };
  },
  mounted() {
    this.fetchIds();
  },
  methods: {
    fetchIds() {
      // Fetch available IDs from the backend
      fetch('http://localhost:5000/ids')
        .then(response => response.json())
        .then(data => {
          this.ids = data;
        });
    },
    fetchData() {
      // Fetch data for the selected ID from the backend
      fetch(`http://localhost:5000/data?id=${this.selectedId}`)
        .then(response => response.json())
        .then(data => {
          this.chartOption.xAxis.data = data.time;
          this.chartOption.series[0].data = data.runoff;
        });
    },
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
