<template>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="form.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程内容" prop="courseContent">
          <el-input type="textarea" v-model="form.courseContent"></el-input>
        </el-form-item>
        <el-form-item label="讲师信息" prop="instructorInfo">
          <el-input type="textarea" v-model="form.instructorInfo"></el-input>
        </el-form-item>
        <el-form-item label="计划招生数" prop="plannedEnrollment">
          <el-input-number v-model="form.plannedEnrollment" :min="1" :max="1000" label="人数"></el-input-number>
        </el-form-item>
        <el-form-item label="课程费用" prop="courseFee">
          <el-input v-model="form.courseFee" prefix="¥"></el-input>
        </el-form-item>
        <el-form-item label="课程培训日期" prop="startDate">
          <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="课程签到时间" prop="trainingTime">
          <el-time-picker v-model="form.trainingTime" placeholder="选择时间"></el-time-picker>
        </el-form-item>
        <el-form-item label="课程培训地点" prop="location">
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item label="报名截止日期" prop="registrationDeadline">
          <el-date-picker v-model="form.registrationDeadline" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">发布通知</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          courseName: '',
          instructorInfo: '',
          plannedEnrollment: 1,
          courseFee: '',
          courseContent: '',
          startDate: '',
          trainingTime: '',
          location: '',
          registrationDeadline: '',
          remarks: ''
        },
        rules: {
          courseName: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ],
          instructorInfo: [
            { required: true, message: '请输入讲师信息', trigger: 'blur' }
          ],
          plannedEnrollment: [
            { required: true, message: '请输入课程计划招生数', trigger: 'blur' }
          ],
          courseFee: [
            { required: true, message: '请输入课程费用', trigger: 'blur' }
          ],
          courseContent: [
            { required: true, message: '请输入课程内容', trigger: 'blur' }
          ],
          startDate: [
            { required: true, message: '请选择课程开始时间', trigger: 'change' }
          ],
          trainingTime: [
            { required: true, message: '请选择课程培训时间', trigger: 'change' }
          ],
          location: [
            { required: true, message: '请输入课程地点', trigger: 'blur' }
          ],
          registrationDeadline: [
            { required: true, message: '请选择报名截止日期', trigger: 'change' }
          ],
          remarks: [
            { required: false, message: '请输入备注', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 模拟提交表单
            console.log('提交成功', this.form);
            this.$message({
              message: '通知发布成功',
              type: 'success'
            });
            // 在此处调用实际的API提交表单数据
          } else {
            console.log('提交失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
  </script>
  
  <style scoped>
  .demo-ruleForm {
    max-width: 600px;
    margin: auto;
  }
  </style>
  