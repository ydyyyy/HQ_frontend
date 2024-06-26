<template>
  <div class="manage">
    <div class="manage-header">
      <el-form :inline="true" :model="filter">
        <el-form-item label="筛选">
          <el-switch
            v-model="filter.showSelected"
            active-text="已选课程"
            inactive-text="未选课程"
            @change="handleFilterChange"
          ></el-switch>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input
            placeholder="请输入课程筛选信息"
            v-model="userForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="refresh"
            >刷新</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="filteredCourses" style="width: 100%" height="90%" stripe>
        <el-table-column prop="courseName" label="课程名称"></el-table-column>
        <el-table-column prop="instructor" label="讲师"></el-table-column>
        <el-table-column prop="date" label="时间" width="250"></el-table-column>
        <el-table-column prop="location" label="地点"></el-table-column>
        <el-table-column prop="scale" label="课程规模"></el-table-column>
        <el-table-column prop="status" label="课程状态">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.selected"
              @click="selectCourse(scope.row)"
              type="primary"
              size="mini"
              >报名</el-button
            >
            <el-button
              v-else
              @click="deselectCourse(scope.row)"
              type="danger"
              size="mini"
              >退选</el-button
            >
            <el-button @click="viewCourse(scope.row)" type="success" size="mini"
              >查看</el-button
            >
            <el-button
              v-if="scope.row.selected"
              @click="reviewCourse(scope.row)"
              type="warning"
              size="mini"
              >评价</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        company: "",
        executor: "",
        cost: "",
        plan: "",
        instructorName: "",
        instructorTitle: "",
        instructorField: "",
        instructorEmail: "",
        instructorPhone: "",
      },
      rules: {
        name: [{ required: true, message: "请输入课程名" }],
        company: [{ required: true, message: "请输入软件公司" }],
        executor: [{ required: true, message: "请输入执行人姓名" }],
        cost: [{ required: true, message: "请输入培训费用" }],
        plan: [{ required: true, message: "请输入培训计划" }],
        instructorName: [{ required: true, message: "请输入讲师姓名" }],
        instructorTitle: [{ required: true, message: "请输入职称" }],
        instructorField: [{ required: true, message: "请输入擅长领域" }],
        instructorEmail: [{ required: true, message: "请输入Email" }],
        instructorPhone: [{ required: true, message: "请输入电话" }],
      },
      tableData: [],
      modalType: 0, //0表示新增的弹窗，1表示编辑
      total: 0, // 当前总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
      filter: {
        showSelected: false,
      },
      courses: [
        {
          id: 1,
          courseName: "Vue.js 基础",
          instructor: "张老师",
          date: "2024-07-01 10:00 - 12:00",
          location: "A101",
          scale: 30,
          status: "未开始",
          selected: false,
        },
        {
          id: 2,
          courseName: "Python 数据分析",
          instructor: "李老师",
          date: "2024-07-03 14:00 - 16:00",
          location: "B202",
          scale: 25,
          status: "进行中",
          selected: false,
        },
        {
          id: 3,
          courseName: "机器学习导论",
          instructor: "王老师",
          date: "2024-07-05 09:00 - 11:00",
          location: "C303",
          scale: 40,
          status: "未开始",
          selected: false,
        },
        {
          id: 4,
          courseName: "计算机学习导论",
          instructor: "刘老师",
          date: "2024-07-08 09:00 - 11:00",
          location: "C305",
          scale: 40,
          status: "未开始",
          selected: false,
        },
        {
          id: 5,
          courseName: "C语言程序设计",
          instructor: "刘老师",
          date: "2024-07-08 09:00 - 11:00",
          location: "C305",
          scale: 40,
          status: "未开始",
          selected: false,
        },
        {
          id: 6,
          courseName: "java程序设计",
          instructor: "刘老师",
          date: "2024-07-08 09:00 - 11:00",
          location: "C305",
          scale: 40,
          status: "未开始",
          selected: false,
        },
        {
          id: 7,
          courseName: "数据库设计",
          instructor: "刘老师",
          date: "2024-07-08 09:00 - 11:00",
          location: "C305",
          scale: 40,
          status: "未开始",
          selected: false,
        },
      ],
    };
  },
  computed: {
    filteredCourses() {
      return this.courses.filter((course) => {
        return this.filter.showSelected ? course.selected : !course.selected;
      });
    },
  },
  methods: {
    handleFilterChange() {
      // 处理筛选条件变化的逻辑
    },
    selectCourse(course) {
      course.selected = true;
    },
    deselectCourse(course) {
      course.selected = false;
    },
    viewCourse(course) {
      this.$message(`查看课程: ${course.courseName}`);
    },
    reviewCourse(course) {
      this.$message(`评价课程: ${course.courseName}`);
    },
    getStatusType(status) {
      switch (status) {
        case "未开始":
          return "info";
        case "已满员":
          return "warning";
        case "进行中":
          return "success";
        case "已结束":
          return "danger";
        default:
          return "";
      }
    },
    // 选择页码的回调函数
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },
    onSubmit() {
      // 处理查询逻辑
      console.log("查询:", this.userForm.name);
    },
    refresh() {
      // 处理刷新逻辑
      console.log("刷新");
    },
  },
};
</script>

<style lang="less" scoped>
.course-selection {
  padding: 20px;
}
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: calc(100% - 62px);
    .pager {
      bottom: 0;
      position: absolute;
      right: 20px;
    }
  }
}
</style>
