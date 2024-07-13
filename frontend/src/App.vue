<template>
  <div id="app">
    <ChartComponent />
  </div>
</template>

<script>
import ChartComponent from './components/ChartComponent.vue';

export default {
  name: 'App',
  components: {
    ChartComponent,
  },
};
</script>

<style>
@import '~view-design/dist/styles/iview.css';
</style>
