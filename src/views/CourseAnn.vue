<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="notice in notices"
        :key="notice.timestamp"
        :timestamp="notice.timestamp"
        placement="top"
      >
        <el-card class="notice-card">
          <div class="card-header">
            <h4>{{ notice.courseName }}</h4>
          </div>
          <div class="card-body">
            <p><strong>讲师:</strong> {{ notice.instructorInfo }}</p>
            <p><strong>计划招生数:</strong> {{ notice.plannedEnrollment }}</p>
            <p><strong>课程费用:</strong> {{ notice.courseFee }}</p>
            <p><strong>开始时间:</strong> {{ notice.startDate }}</p>
            <p><strong>培训时间:</strong> {{ notice.trainingTime }}</p>
            <p><strong>课程地点:</strong> {{ notice.location }}</p>
            <p><strong>报名截止日期:</strong> {{ notice.registrationDeadline }}</p>
            <p><strong>备注:</strong> {{ notice.remarks }}</p>
          </div>
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
  margin:  auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.el-timeline-item {
  margin-bottom: 20px;
}

.notice-card {
  background: linear-gradient(135deg, #f0f0f0, #ffffff);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
}

.notice-card:hover {
  transform: scale(1.02);
}

.card-header {
  background-color: #3eaf7c;
  padding: 15px;
  border-radius: 8px 8px 0 0;
  color: white;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
}

.card-body {
  padding: 20px;
  background-color: #ffffff;
}

.card-body p {
  margin: 10px 0;
  font-size: 14px;
  color: #333;
}

.card-body p strong {
  color: #3eaf7c;
  font-weight: bold;
}
</style>
