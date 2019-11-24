<template>
  <div id="chart">
    <apexchart height=350 :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'Timeline',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [{
        name: 'Desktops',
        data: [1, 5, 3, 2, 8, 4, 9, 7, 5],
      }],
      chartOptions: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'My Timeline',
          align: 'center',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ['1995', '2001', '2003', '2007', '2011', '2014', '2017', '2018', '2019'],
        },
      },
    };
  },
};
</script>
