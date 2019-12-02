<template>
  <el-dialog
    class="event-modal"
    :title="title"
    :visible.sync="showModal"
    width="50%"
    :fullscreen="$mq === 'xs'"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form
      ref="eventForm"
      :model="eventForm"
      :rules="rules"
      label-position="top">
      <el-form-item label="Title" prop="title">
        <el-input v-model="eventForm.title" clearable></el-input>
      </el-form-item>
      <el-row>
        <el-col :lg="12" :md="14">
          <el-form-item label="Date" prop="date" required>
            <el-date-picker
              v-model="eventForm.date"
              class="event-date"
              :class="$mq"
              type="date"
              placeholder="MM/DD/YYY"
              format="MM/dd/yyyy"
              value-format="MM-dd-yyyy">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="10">
          <el-form-item label="Rating (1-10)" prop="rating">
            <el-input-number
              v-model="eventForm.rating"
              class="event-rating"
              :class="$mq"
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
      <el-button
        type="primary"
        :icon="submitIcon"
        @click="submitForm()">{{submitLabel}}
      </el-button>
      <el-button v-if="!isEditModal" @click="resetForm()">Reset</el-button>
      <el-button @click="closeEventModal">Cancel</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'EventModal',
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    isEditModal: {
      type: Boolean,
      default: false,
    },
    eventData: {
      type: Object,
      default() {
        return {
          title: '',
          date: '',
          rating: null,
          description: '',
        };
      },
    },
  },
  computed: {
    title() {
      return `${this.isEditModal ? 'Edit' : 'Add'} Event to Timeline`;
    },
    submitLabel() {
      return this.isEditModal ? 'Done' : 'Add';
    },
    submitIcon() {
      return this.isEditModal ? 'el-icon-check' : 'el-icon-plus';
    },
  },
  data() {
    return {
      eventForm: {},
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
    submitForm() {
      // eslint-disable-next-line consistent-return
      this.$refs.eventForm.validate((valid) => {
        if (valid) {
          const event = Object.assign({}, this.eventForm);
          this.$emit('submitted', event);
          this.closeEventModal();
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.eventForm.resetFields();
    },
    closeEventModal() {
      this.$emit('closed');
      this.resetForm();
    },
  },
  watch: {
    eventData(val) {
      this.eventForm = JSON.parse(JSON.stringify(val));
    },
  },
};
</script>

<style scoped lang="scss">
  .event-modal{
    .el-form {
      /deep/ .el-form-item__label {
        font-weight: bold;
        padding: 0;
      }
    }
    .event-date {
      &.xs, &.sm {
        width: 100%;
      }
    }
    .event-rating {
      &.xs, &.sm {
        width: 100%;
      }
    }
  }
</style>
