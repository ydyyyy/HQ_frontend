<template>
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="notice in notices"
          :key="notice.timestamp"
          :timestamp="notice.timestamp"
          placement="top"
        >
          <el-card>
            <h4>{{ notice.courseName }}</h4>
            <p>讲师: {{ notice.instructorInfo }}</p>
            <p>计划招生数: {{ notice.plannedEnrollment }}</p>
            <p>课程费用: {{ notice.courseFee }}</p>
            <p>开始时间: {{ notice.startDate }}</p>
            <p>培训时间: {{ notice.trainingTime }}</p>
            <p>课程地点: {{ notice.location }}</p>
            <p>报名截止日期: {{ notice.registrationDeadline }}</p>
            <p>备注: {{ notice.remarks }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notices: [
        {
            courseName: 'Springboot 基础培训',
            instructorInfo: '王老师',
            plannedEnrollment: 30,
            courseFee: '¥3000',
            startDate: '2024-07-01',
            trainingTime: '09:00-17:00',
            location: '哈尔滨市南岗区',
            registrationDeadline: '2024-06-20',
            remarks: '具备Java知识',
            timestamp: '2024/06/03'
          },  
        {
            courseName: 'Vue.js 基础培训',
            instructorInfo: '张老师',
            plannedEnrollment: 30,
            courseFee: '¥2000',
            startDate: '2024-07-01',
            trainingTime: '09:00-17:00',
            location: '上海市黄浦区',
            registrationDeadline: '2024-06-20',
            remarks: '请提前准备好电脑',
            timestamp: '2024/06/02'
          },
          {
            courseName: 'Python 数据分析',
            instructorInfo: '李老师',
            plannedEnrollment: 25,
            courseFee: '¥2500',
            startDate: '2024-07-15',
            trainingTime: '10:00-18:00',
            location: '北京市海淀区',
            registrationDeadline: '2024-07-05',
            remarks: '需具备基础的Python知识',
            timestamp: '2024/06/01'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .block {
    max-width: 800px;
    margin: 50px auto;
  }
  </style>
  