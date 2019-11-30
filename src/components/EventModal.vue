<template>
  <el-dialog
    class="event-modal"
    :title="title"
    :visible.sync="showModal"
    width="40%"
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
        <el-col :span="12">
          <el-form-item label="Date" prop="date" required>
            <el-date-picker
              v-model="eventForm.date"
              type="date"
              placeholder="MM/DD/YYY"
              format="MM/dd/yyyy"
              value-format="MM-dd-yyyy">
            </el-date-picker>
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
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="submitForm()">{{submitLabel}}
      </el-button>
      <el-button @click="resetForm()">Reset</el-button>
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
  },
  computed: {
    title() {
      return `${this.isEditModal ? 'Edit' : 'Add'} Event to Timeline`;
    },
    submitLabel() {
      return this.isEditModal ? 'Done' : 'Add';
    },
  },
  data() {
    return {
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
    submitForm() {
      // eslint-disable-next-line consistent-return
      this.$refs.eventForm.validate((valid) => {
        if (valid) {
          const newEvent = Object.assign({}, this.eventForm);
          this.$emit('submitted', newEvent);
          this.closeEventModal();
        } else {
          console.log('Error on submit!');
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
  }
</style>
