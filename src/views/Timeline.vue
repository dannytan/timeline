<template>
  <div id="chart">
    <apexchart height=350 :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

// TODO - Change to show data points at all times, not just on hover
export default {
  name: 'Timeline',
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    series() {
      const ratings = [];
      this.events.forEach((event) => {
        ratings.push(event.rating);
      });

      return [{
        name: 'Rating',
        data: ratings,
      }];
    },
    chartOptions() {
      const dates = [];
      this.events.forEach((event) => {
        dates.push(event.date);
      });

      return {
        chart: {
          type: 'line',
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
        colors: ['#ba334f'],
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
        labels: dates,
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          min: 0,
          max: 10,
        },
      };
    },
  },
  data() {
    return {
      events: [{
        title: 'Test Event',
        date: '11-20-2019',
        rating: 9,
        description: 'This is a test description.',
      }, {
        title: 'Test Event 2',
        date: '11-28-2019',
        rating: 3,
        description: 'This is another test description.',
      }],
    };
  },
};
</script>
