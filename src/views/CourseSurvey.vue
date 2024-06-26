<template>
    <div class="survey-container">
      <h2 class="survey-title">现场工作人员培训调查</h2>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入您的部门"></el-input>
        </el-form-item>
        <el-form-item label="培训日期" prop="date">
          <el-date-picker v-model="form.date" type="date" placeholder="选择培训日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="培训内容" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="请描述培训内容"></el-input>
        </el-form-item>
        <el-form-item label="培训满意度" prop="satisfaction">
          <el-rate v-model="form.satisfaction" :max="5"></el-rate>
        </el-form-item>
        <el-form-item label="培训意见" prop="feedback">
          <el-input type="textarea" v-model="form.feedback" placeholder="请提供您的意见和建议"></el-input>
        </el-form-item>
        <el-form-item class="form-buttons">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
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
          name: '',
          department: '',
          date: '',
          content: '',
          satisfaction: 0,
          feedback: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' }
          ],
          department: [
            { required: true, message: '请输入您的部门', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请选择培训日期', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请描述培训内容', trigger: 'blur' }
          ],
          satisfaction: [
            { required: true, message: '请给出您的满意度评价', trigger: 'change' }
          ],
          feedback: [
            { required: false, message: '请提供您的意见和建议', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('提交成功', this.form);
            this.$message({
              message: '调查提交成功',
              type: 'success'
            });
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
  .survey-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
  }
  
  .survey-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .demo-ruleForm {
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .el-input, .el-date-picker, .el-rate {
    width: 100%;
  }
  
  .form-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .el-button {
    width: 48%;
  }
  </style>
  