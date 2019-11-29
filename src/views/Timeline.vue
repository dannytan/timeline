<template>
  <div id="chart">
    <el-row type="flex" align="middle">
      <el-col :span="12">
        <div class="chart-title">Spiritual Timeline</div>
      </el-col>
      <el-col :span="12">
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="add-event-btn"
          size="medium"
          @click="openAddEventDialog">Add Event</el-button>
      </el-col>
    </el-row>
    <apexchart height=350 :options="chartOptions" :series="series" />
    <el-dialog
      class="add-event-dialog"
      title="Add Event To Timeline"
      :visible.sync="showAddEventDialog"
      width="40%"
      center>
      <el-row class="dialog-row">
        <el-col :span="24">
          <div class="input-label">Title</div>
          <el-input
            v-model="newEvent.title"
            clearable>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="dialog-row">
        <el-col :span="12" class="column-left">
          <div class="input-label">Date</div>
          <el-date-picker
            class="full-width"
            v-model="newEvent.date"
            type="date"
            placeholder="MM/DD/YYY"
            format="MM/dd/yyyy"
            value-format="MM-dd-yyyy">
          </el-date-picker>
        </el-col>
        <el-col :span="12" class="column-right">
          <div class="input-label">Rating (1-10)</div>
          <el-input-number
            class="full-width"
            v-model="newEvent.rating"
            controls-position="right"
            :min="1"
            :max="10">
          </el-input-number>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="input-label">Description (Optional)</div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="newEvent.description">
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer">
    <el-button @click="closeAddEventDialog">Cancel</el-button>
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="addEvent">Add</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

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
          toolbar: {
            show: false,
          },
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
        colors: ['#ba334f'],
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
      showAddEventDialog: false,
      newEvent: {
        title: '',
        date: '',
        rating: null,
        description: '',
      },
      events: [{
        title: 'Test Event',
        date: '11-20-2017',
        rating: 9,
        description: 'This is a test description.',
      }, {
        title: 'Test Event 2',
        date: '11-28-2018',
        rating: 3,
        description: 'This is another test description.',
      }, {
        title: 'Test Event 2',
        date: '11-30-2019',
        rating: 6,
        description: 'This is another test description.',
      }],
    };
  },
  methods: {
    openAddEventDialog() {
      this.showAddEventDialog = true;
    },
    closeAddEventDialog() {
      this.showAddEventDialog = false;
      this.clearNewEvent();
    },
    addEvent() {
      this.events.push(this.newEvent);
      this.closeAddEventDialog();
    },
    clearNewEvent() {
      this.newEvent = {
        title: '',
        date: '',
        rating: null,
        description: '',
      };
    },
  },
};
</script>

<style scoped lang="scss">
  .chart-title {
    color: #873031;
    font-size: 26px;
    font-weight: bold;
    padding: 5px 25px;
  }

  .add-event-btn {
    float: right;
  }

  .add-event-dialog {
    .input-label {
      font-weight: bold;
      margin-bottom: 5px;
    }
    .dialog-row {
      margin-bottom: 20px;
      .column-left {
        padding-right: 10px;
      }
      .column-right {
        padding-left: 10px;
      }
      .full-width {
        width: 100%;
      }
    }
  }
</style>
