<template>
  <div id="chart">
    <el-row type="flex" align="middle">
      <el-col :span="12">
        <div class="chart-title">Spiritual Timeline</div>
      </el-col>
      <el-col :span="12">
        <div class="event-action-btn-container">
          <el-button
            type="primary"
            icon="el-icon-plus"
            class="event-action-btn"
            size="medium"
            @click="openAddEventDialog">Add Event</el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            class="event-action-btn"
            size="medium"
            @click="openEditEventsDialog">Edit Events</el-button>
        </div>
      </el-col>
    </el-row>
    <apexchart height=500 :options="chartOptions" :series="series" />
    <el-row>
      <el-col :span="8" :offset="8" style="text-align: center">
        <h2 style="color: #ba334f">{{selectedEvent.title}}</h2>
        <h4>{{selectedEvent.date}}</h4>
        <el-tag v-show="selectedEvent.rating">Rating: {{selectedEvent.rating}}</el-tag>
        <p>{{selectedEvent.description}}</p>
      </el-col>
    </el-row>
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
    <el-dialog
      class="edit-events-dialog"
      title="Edit Timeline Events"
      :visible.sync="showEditEventsDialog">
      <el-timeline>
        <el-timeline-item
          v-for="(event, index) in orderedEvents"
          :key="index"
          type="primary"
          :timestamp="event.date"
          placement="top">
          <el-card class="timeline-card">
            <div>
              <div class="timeline-card-title">{{event.title}}</div>
              <el-tag class="timeline-card-rating" size="small">Rating: {{event.rating}}</el-tag>
              <div class="timeline-card-actions">
                <el-button
                  type="text"
                  icon="el-icon-edit-outline"
                  class="timeline-card-action-btn"
                  @click="editEvent(index)">
                </el-button>
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  class="timeline-card-action-btn"
                  @click="deleteEvent(index)">
                </el-button>
              </div>
            </div>
            <p>{{event.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <span slot="footer">
       <el-button type="primary"
                  @click="showEditEventsDialog = false">Done</el-button>
          <el-button @click="showEditEventsDialog = false">Cancel</el-button>
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
    orderedEvents() {
      const orderedEvents = this.events;
      return orderedEvents.sort(this.compareEvents);
    },
    series() {
      const ratings = [];
      this.orderedEvents.forEach((event) => {
        ratings.push(event.rating);
      });

      return [{
        name: 'Rating',
        data: ratings,
      }];
    },
    chartOptions() {
      const dates = [];
      this.orderedEvents.forEach((event) => {
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
          events: {
            markerClick: (a, b, marker) => {
              this.setSelectedEvent(marker.dataPointIndex);
            },
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
      showEditEventsDialog: false,
      selectedEvent: {},
      events: [{
        title: 'Test Event',
        date: '11-20-2017',
        rating: 9,
        description: 'This is a test description.',
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
    setSelectedEvent(eventIndex) {
      this.selectedEvent = this.orderedEvents[eventIndex];
    },
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
    openEditEventsDialog() {
      this.showEditEventsDialog = true;
    },
    editEvent(index) {
      console.log(index);
    },
    deleteEvent(index) {
      this.events.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss">
  .chart-title {
    color: #ba334f;
    font-size: 26px;
    font-weight: bold;
    padding: 5px 25px;
  }

  .event-action-btn-container {
    float: right;
    .event-action-btn {
      display: inline-flex;
    }
  }

  .add-event-dialog {
    .el-form {
      /deep/ .el-form-item__label {
        font-weight: bold;
        padding: 0;
      }
    }
  }

  .edit-events-dialog {
    .timeline-card {
      /deep/ .el-card__body {
        padding: 20px 20px 10px 20px;
      }

      .timeline-card-title {
        display: inline-flex;
        font-weight: bold;
        font-size: 16px;
      }

      .timeline-card-rating {
        display: inline-flex;
        margin-left: 10px;
      }

      .timeline-card-actions {
        float: right;
      }

      .timeline-card-action-btn {
        display: inline-flex;
        padding-top: 2px;
        margin-left: 4px;
        font-size: 18px;
      }
    }
  }
</style>
