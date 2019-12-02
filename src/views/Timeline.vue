<template>
  <div id="chart">
    <el-row type="flex" align="middle">
      <el-col :span="12" :xs="16">
        <div class="chart-title" :class="$mq">
          <span v-if="!isXs">Timeline - </span>{{timelineTitle}}
          <el-dropdown @command="handleCommand">
            <div>
              <el-button
                class="timeline-dropdown"
                type="text"
                icon="el-icon-caret-bottom">
              </el-button>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="spiritual" v-if="!isSpiritual">Spiritual</el-dropdown-item>
              <el-dropdown-item command="personal" v-if="!isPersonal">Personal</el-dropdown-item>
              <el-dropdown-item command="combined">Combined</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="12" :xs="8">
        <div class="event-action-btn-container">
          <el-button
            v-if="!isXs"
            type="primary"
            icon="el-icon-plus"
            class="event-action-btn"
            size="medium"
            @click="openAddEventModal">Add Event</el-button>
          <el-button
            v-if="!isXs"
            type="primary"
            plain
            icon="el-icon-edit"
            class="event-action-btn"
            size="medium"
            @click="openEditTimelineModal">Edit Events</el-button>
          <el-button-group v-if="isXs">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="openAddEventModal"
            ></el-button>
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              size="small"
              @click="openEditTimelineModal">
            </el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <apexchart
      ref="apexchart"
      :height="chartHeight"
      :options="chartOptions"
      :series="chartSeries" />
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
    <EventModal
      :show-modal="showAddEventModal"
      @submitted="addEvent"
      @closed="closeAddEventModal"></EventModal>
    <el-dialog
      class="edit-events-dialog"
      title="Edit Timeline Events"
      :width="isSm ? '65%' : '50%'"
      :fullscreen="isXs"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showEditTimelineModal">
      <div v-if="orderedEvents.length < 1" style="text-align: center">No Event Data</div>
      <el-timeline>
        <el-timeline-item
          v-for="(event, index) in orderedEvents"
          :key="index"
          type="primary"
          :timestamp="event.date"
          placement="top">
          <el-card class="timeline-card" :class="$mq">
            <div class="timeline-card-title">{{event.title}}</div>
            <el-tag class="timeline-card-rating" size="mini">Rating: {{event.rating}}</el-tag>
            <div class="timeline-card-actions" v-if="isLg || isXl">
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
            <p class="timeline-card-description">{{event.description}}</p>
            <div class="timeline-card-actions" v-if="!isLg && !isXl">
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
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <span slot="footer">
       <el-button type="primary"
                  @click="closeEditTimelineModal">Done</el-button>
          <el-button @click="closeEditTimelineModal">Cancel</el-button>
      </span>
    </el-dialog>
    <EventModal
      :show-modal="showEditEventModal"
      is-edit-modal
      :event-data="editEventData"
      @submitted="completeEditEvent"
      @closed="closeEditEventModal"></EventModal>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import EventModal from '../components/EventModal.vue';

export default {
  name: 'Timeline',
  components: {
    apexchart: VueApexCharts,
    EventModal,
  },
  computed: {
    isSpiritual() {
      return this.timelineType === 'spiritual';
    },
    isPersonal() {
      return this.timelineType === 'personal';
    },
    timelineTitle() {
      if (this.isSpiritual) {
        return 'Spiritual';
      }
      if (this.isPersonal) {
        return 'Personal';
      }
      return '';
    },
    localStorageEvents() {
      if (this.isSpiritual) {
        return 'events-spiritual';
      }
      if (this.isPersonal) {
        return 'events-personal';
      }
      return '';
    },
    orderedEvents() {
      if (this.events && this.events.length > 0) {
        const orderedEvents = this.events;
        return orderedEvents.sort(this.compareEvents);
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
      timelineType: 'spiritual',
      showAddEventModal: false,
      showEditEventModal: false,
      showEditTimelineModal: false,
      editEventData: {},
      editIndex: null,
      selectedEvent: {},
      events: [],
      chartSeries: [],
      chartOptions: {},
    };
  },
  methods: {
    updateChart() {
      const dates = [];
      this.orderedEvents.forEach((event) => {
        dates.push(event.date);
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

      const ratings = [];
      this.orderedEvents.forEach((event) => {
        ratings.push(event.rating);
      });
      this.chartSeries = [{
        name: 'Rating',
        data: ratings,
      }];
    },
    openAddEventModal() {
      this.showAddEventModal = true;
    },
    closeAddEventModal() {
      this.showAddEventModal = false;
    },
    addEvent(newEvent) {
      this.events.push(newEvent);
      localStorage.setItem(this.localStorageEvents, JSON.stringify(this.orderedEvents));
      this.updateChart();
    },
    setSelectedEvent(eventIndex) {
      this.selectedEvent = this.orderedEvents[eventIndex];
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
    openEditTimelineModal() {
      this.showEditTimelineModal = true;
    },
    closeEditTimelineModal() {
      this.showEditTimelineModal = false;
    },
    openEditEventModal() {
      this.closeEditTimelineModal();
      this.showEditEventModal = true;
    },
    closeEditEventModal() {
      this.showEditEventModal = false;
    },
    completeEditEvent(event) {
      const updatedEvent = JSON.parse(JSON.stringify(event));
      this.events[this.editIndex] = updatedEvent;
      // This is needed to update the computed property: orderedEvents
      this.events = JSON.parse(JSON.stringify(this.events));
      localStorage.setItem(this.localStorageEvents, JSON.stringify(this.orderedEvents));
      this.selectedEvent = updatedEvent;
      this.updateChart();
    },
    editEvent(index) {
      this.editEventData = JSON.parse(JSON.stringify(this.orderedEvents[index]));
      this.editIndex = index;
      this.openEditEventModal();
    },
    deleteEvent(index) {
      this.events.splice(index, 1);
      this.updateChart();
    },
    handleCommand(command) {
      localStorage.setItem('timeline-type', command);
      if (command === 'combined') {
        this.$router.push('/timeline/combined');
      } else {
        this.setTimelineTypeFromLocalStorage();
        this.setEventsFromLocalStorage();
        this.updateChart();
        this.selectedEvent = {};
      }
    },
    setEventsFromLocalStorage() {
      const events = localStorage.getItem(this.localStorageEvents);
      this.events = events ? JSON.parse(events) : [];
    },
    setTimelineTypeFromLocalStorage() {
      const type = localStorage.getItem('timeline-type');
      this.timelineType = type || 'personal';
    },
  },
  created() {
    this.setTimelineTypeFromLocalStorage();
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

  .event-action-btn-container {
    float: right;
    .event-action-btn {
      display: inline-flex;
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

  .edit-events-dialog {
    .el-timeline {
      padding: 0;
    }
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

      &.md, &.sm {
        .timeline-card-title {
          width: 100%;
        }
        .timeline-card-rating {
          margin: 10px 0 0 0;
        }
      }
      &.xs {
        .timeline-card-title {
          font-size: 15px;
          width: 100%;
        }
        .timeline-card-rating {
          margin: 10px 0 0 0;
        }
        .timeline-card-description {
          font-size: 13px;
        }
      }
    }
  }
</style>
