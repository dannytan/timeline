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
      width="40%">
      <el-form :model="eventForm" :rules="rules" ref="eventForm"
               label-position="top">
        <el-form-item label="Title" prop="title">
          <el-input v-model="eventForm.title" clearable></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12"><el-form-item label="Date" required>
            <el-form-item prop="date">
              <el-date-picker
                v-model="eventForm.date"
                type="date"
                placeholder="MM/DD/YYY"
                format="MM/dd/yyyy"
                value-format="MM-dd-yyyy">
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Rating" prop="rating">
              <el-input-number
                v-model="eventForm.rating"
                controls-position="right"
                :min="1"
                :max="10">
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Description" prop="description">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="eventForm.description">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
       <el-button type="primary"
                  icon="el-icon-plus"
                  @click="submitForm()">Add</el-button>
          <el-button @click="resetForm()">Reset</el-button>
          <el-button @click="closeAddEventDialog">Cancel</el-button>
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
            colors: ['#f3f3f3', 'transparent'],
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
      eventForm: {
        title: '',
        date: '',
        rating: null,
        description: '',
      },
      rules: {
        title: [
          { required: true, message: 'Please input an event title.', trigger: 'blur' },
          { max: 50, message: 'Character limit is 50', trigger: 'blur' },
        ],
        date: [
          { required: true, message: 'Please pick a date', trigger: 'change' },
        ],
        rating: [
          { required: true, message: 'Please choose a rating', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    openAddEventDialog() {
      this.showAddEventDialog = true;
    },
    closeAddEventDialog() {
      this.showAddEventDialog = false;
      this.resetForm();
    },
    submitForm() {
      // eslint-disable-next-line consistent-return
      this.$refs.eventForm.validate((valid) => {
        if (valid) {
          const newEvent = Object.assign({}, this.eventForm);
          this.events.push(newEvent);
          this.closeAddEventDialog();
        } else {
          console.log('Error on submit!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.eventForm.resetFields();
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
    .el-form {
      /deep/ .el-form-item__label {
        font-weight: bold;
        padding: 0;
      }
    }
  }
</style>
