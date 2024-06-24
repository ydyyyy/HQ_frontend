<template>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="公司名称" prop="company">
          <el-input v-model="form.company"></el-input>
        </el-form-item>
        <el-form-item label="申请人姓名" prop="applicant">
          <el-input v-model="form.applicant"></el-input>
        </el-form-item>
        <el-form-item label="培训主题" prop="topic">
          <el-input v-model="form.topic"></el-input>
        </el-form-item>
        <el-form-item label="培训时间" prop="date">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="培训内容" prop="content">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="培训规模(人数)" prop="scale">
          <el-input-number v-model="form.scale" :min="1" :max="1000" label="人数"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交申请</el-button>
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
          company: '',
          applicant: '',
          topic: '',
          date: '',
          content: '',
          scale: 1,
          remarks: ''
        },
        rules: {
          company: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          applicant: [
            { required: true, message: '请输入申请人姓名', trigger: 'blur' }
          ],
          topic: [
            { required: true, message: '请输入培训主题', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请选择培训时间', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入培训内容', trigger: 'blur' }
          ],
          scale: [
            { required: true, message: '请输入培训规模', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '请输入备注', trigger: 'blur' }
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
              message: '申请提交成功',
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
    margin: 50px auto;
  }
  </style>
  