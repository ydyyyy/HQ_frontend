<template>
    <div class="evaluationSummary">
      <div class="manage-header">
        <el-select v-model="selectedCourse" placeholder="课程筛选" @change="handleCourseChange">
          <el-option v-for="course in courses" :key="course.id" :label="course.name" :value="course"></el-option>
        </el-select>
      </div>
  
      <el-form label-width="70px" :inline="true" class="summary-form" :model="form" ref="form">
        <h3 class="title">课程学员评价汇总</h3>
        <el-divider>评分信息</el-divider>
        <el-row>
          <el-col :span="24">
            <el-form-item label="课程名称" class="full-width">
              <el-input v-model="form.courseName" disabled></el-input>
            </el-form-item>
            <el-form-item label="课程均分" class="full-width">
              <el-rate v-model="form.aveCourseScore" disabled show-score text-color="#ff9900" score-template="{value}">
              </el-rate>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row>
          <el-col :span="24">
            <el-form-item label="讲师姓名" class="full-width">
              <el-input v-model="form.teacherName" disabled></el-input>
            </el-form-item>
            <el-form-item label="讲师均分" class="full-width">
              <el-rate v-model="form.aveTeacherScore" disabled show-score text-color="#ff9900" score-template="{value}">
              </el-rate>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-divider>学员意见与建议</el-divider>
        <div id="wordCloud" class="word-cloud"></div>
      </el-form>
    </div>
  </template>
  
  <script>
  import WordCloud from 'wordcloud';
  
  export default {
    data() {
      return {
        courses: [
          { id: 1, name: "数学课程" },
          { id: 2, name: "编程课程" }
        ],
        selectedCourse: null,
        form: {
          courseName: '',
          aveCourseScore: 0,
          teacherName: '',
          aveTeacherScore: 0,
          opinions: []
        },
        rules: {}  // 确保规则对象存在
      };
    },
    methods: {
      handleCourseChange() {
        this.fetchCourseEvaluations();
      },
      fetchCourseEvaluations() {
        if (!this.selectedCourse) return;
  
        const fakeEvaluations = {
          1: {
            courseName: "数学课程",
            teacherName: "张老师",
            aveCourseScore: 4.5,
            aveTeacherScore: 4.8,
            opinions: ["很棒", "讲解详细", "有趣", "知识点清晰"]
          },
          2: {
            courseName: "编程课程",
            teacherName: "李老师",
            aveCourseScore: 4.2,
            aveTeacherScore: 4.6,
            opinions: ["实用", "内容丰富", "有挑战性", "互动性强"]
          }
        };
  
        const data = fakeEvaluations[this.selectedCourse.id];
        this.form.courseName = data.courseName;
        this.form.teacherName = data.teacherName;
        this.form.aveCourseScore = data.aveCourseScore;
        this.form.aveTeacherScore = data.aveTeacherScore;
        this.form.opinions = data.opinions;
  
        this.generateWordCloud(data.opinions);
      },
      generateWordCloud(opinions) {
        const wordList = opinions.map(word => [word, Math.random() * 50 + 10]);
        WordCloud(document.getElementById('wordCloud'), { list: wordList });
      }
    },
    mounted() {
      this.selectedCourse = this.courses[0];
      this.fetchCourseEvaluations();
    }
  };
  </script>
  
  <style scoped>
  .evaluationSummary {
    width: 80%;
    margin: 20px auto;
    padding: 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 15px #cac6c6;
    position: relative;
  }
  
  .manage-header {
    position: absolute;
    top: 20px;
    left: 20px;
  }
  
  .summary-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .title {
    text-align: center;
  }
  
  .word-cloud {
    width: 100%;
    height: 300px;
    margin: 20px 0;
  }
  </style>
  <!-- 使禁用的input颜色与不禁用一致 -->
<style lang="less" scoped>
.el-input.is-disabled /deep/ .el-input__inner {
  color: #606266;
  background-color: #f8f8f8;
}
</style>