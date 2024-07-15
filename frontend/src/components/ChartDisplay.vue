<template>
    <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { defineProps } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { provide } from 'vue';

use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
]);

provide(THEME_KEY, 'dark');

const props = defineProps({
    option: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
.chart {
    width: 80%;
    /* Adjust as needed */
    max-width: 800px;
    /* Adjust as needed */
    height: 60vh;
    margin-top: 20px;
}
</style>