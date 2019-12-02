<template>
  <div id="chart">
    <el-row type="flex" align="middle">
      <el-col :span="24">
        <div class="chart-title" :class="$mq">
          Timeline - Combined
          <el-dropdown @command="handleCommand">
            <div>
              <el-button
                class="timeline-dropdown"
                type="text"
                icon="el-icon-caret-bottom">
              </el-button>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="spiritual">Spiritual</el-dropdown-item>
              <el-dropdown-item command="personal">Personal</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <apexchart
      ref="apexchart"
      :height="chartHeight"
      :options="chartOptions"
      :series="chartSeries"/>
    <el-row>
      <el-col :span="12" :offset="6" :xs="{ span: 22, offset: 1 }"
              class="event-details" :class="$mq">
        <h2 class="event-title">{{selectedEvent.title}}</h2>
        <h4 class="event-date">{{selectedEvent.date}}</h4>
        <el-tag
          v-show="selectedEvent.rating"
          size="medium">
          Rating: {{selectedEvent.rating}}
        </el-tag>
        <p class="event-description">{{selectedEvent.description}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'TimelineCombined',
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    orderedPersonalEvents() {
      if (this.eventsPersonal && this.eventsPersonal.length > 0) {
        const orderedPersonalEvents = this.eventsPersonal;
        return orderedPersonalEvents.sort(this.compareEvents);
      }
      return [];
    },
    orderedSpiritualEvents() {
      if (this.eventsSpiritual && this.eventsSpiritual.length > 0) {
        const orderedSpiritualEvents = this.eventsSpiritual;
        return orderedSpiritualEvents.sort(this.compareEvents);
      }
      return [];
    },
    chartHeight() {
      return this.$mq === 'xs' ? '400' : '500';
    },
    isXs() {
      return this.$mq === 'xs';
    },
    isSm() {
      return this.$mq === 'sm';
    },
    isMd() {
      return this.$mq === 'md';
    },
    isLg() {
      return this.$mq === 'lg';
    },
    isXl() {
      return this.$mq === 'xl';
    },
  },
  data() {
    return {
      selectedEvent: {},
      eventsPersonal: [],
      eventsSpiritual: [],
      chartSeries: [],
      chartOptions: {},
    };
  },
  methods: {
    updateChart() {
      const personalSeries = [];
      const spiritualSeries = [];
      const orderedDates = [];

      const allEvents = this.eventsPersonal.concat(this.eventsSpiritual);
      let orderedAllEvents = [];
      if (allEvents && allEvents.length > 0) {
        orderedAllEvents = allEvents.sort(this.compareEvents);
        orderedAllEvents.forEach((event) => {
          orderedDates.push(event.date);
        });
      }

      this.orderedPersonalEvents.forEach((event) => {
        personalSeries.push({
          x: event.date, y: event.rating,
        });
      });
      this.orderedSpiritualEvents.forEach((event) => {
        spiritualSeries.push({
          x: event.date, y: event.rating,
        });
      });
      this.chartOptions = {
        chart: {
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          events: {
            dataPointSelection: (a, b, marker) => {
              this.setSelectedEvent(marker.seriesIndex, marker.dataPointIndex);
            },
          },
        },
        tooltip: {
          intersect: true,
          shared: false,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 5,
          hover: {
            size: 7,
          },
        },
        stroke: {
          curve: 'straight',
        },
        colors: ['#ba334f', '#2E294E'],
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        labels: orderedDates,
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          min: 0,
          max: 10,
        },
      };
      this.chartSeries = [{
        name: 'Personal',
        data: personalSeries,
      }, {
        name: 'Spiritual',
        data: spiritualSeries,
      }];
    },
    setSelectedEvent(seriesIndex, eventIndex) {
      if (seriesIndex === 0) {
        this.selectedEvent = JSON.parse(JSON.stringify(this.orderedPersonalEvents[eventIndex]));
      } else if (seriesIndex === 1) {
        this.selectedEvent = JSON.parse(JSON.stringify(this.orderedSpiritualEvents[eventIndex]));
      }
    },
    compareEvents(a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      let comparison = 0;
      if (dateA.getTime() > dateB.getTime()) {
        comparison = 1;
      } else if (dateA.getTime() < dateB.getTime()) {
        comparison = -1;
      }
      return comparison;
    },
    handleCommand(command) {
      localStorage.setItem('timeline-type', command);
      this.$router.push('/timeline');
      this.selectedEvent = {};
    },
    setEventsFromLocalStorage() {
      const eventsPersonal = localStorage.getItem('events-personal');
      if (eventsPersonal) {
        this.eventsPersonal = JSON.parse(eventsPersonal);
      }
      const eventsSpiritual = localStorage.getItem('events-spiritual');
      if (eventsSpiritual) {
        this.eventsSpiritual = JSON.parse(eventsSpiritual);
      }
    },
  },
  created() {
    this.setEventsFromLocalStorage();
    this.updateChart();
  },
};
</script>

<style scoped lang="scss">
  .chart-title {
    color: #ba334f;
    font-size: 26px;
    font-weight: bold;
    padding: 5px 25px;

    .timeline-dropdown {
      font-size: 24px;
    }

    &.xs {
      font-size: 18px;
    }
  }

  .event-details {
    text-align: center;

    .event-title {
      color: #ba334f;
    }

    &.xs {
      .event-title {
        font-size: 18px;
      }
      .event-date {
        font-size: 14px;
      }
      .event-description {
        font-size: 14px;
      }
    }
  }
</style>
