<!-- 学生选课界面 -->
<template>
  <div class="manage">
    <!-- 查询课程信息对话框 -->
    <el-dialog title="课程信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 课程表单信息 -->
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="100px">
        <el-form-item label="课程名" prop="name" class="full-width">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="软件公司" prop="company" class="full-width">
          <el-input v-model="form.company"></el-input>
        </el-form-item>
        <el-form-item label="执行人" prop="executor" class="full-width">
          <el-input v-model="form.executor"></el-input>
        </el-form-item>
        <el-form-item label="培训费用" prop="cost" class="full-width">
          <el-input v-model="form.cost"></el-input>
        </el-form-item>
        <el-form-item label="培训计划" prop="plan" class="large-width">
          <el-input type="textarea" :rows="8" style="width: 525px; height: 200px" v-model="form.plan"></el-input>
        </el-form-item>

        <!-- 讲师资料 -->
        <el-divider>讲师资料</el-divider>
        <el-form-item label="姓名" prop="instructorName" class="full-width">
          <el-input v-model="form.teacher"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="instructorTitle" class="full-width">
          <el-input v-model="form.teacherTitle"></el-input>
        </el-form-item>
        <el-form-item label="擅长领域" prop="instructorField" class="full-width">
          <el-input v-model="form.teacherField"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="instructorEmail" class="full-width">
          <el-input v-model="form.teacherEmail"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="instructorPhone" class="full-width">
          <el-input v-model="form.teacherPhone"></el-input>
        </el-form-item>
        <el-form-item label="培训内容" prop="trainingContent" class="large-width">
          <el-input type="textarea" :rows="4" style="width: 525px; height: 100px"
            v-model="form.trainingContent"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="trainingStartTime" class="full-width">
          <el-date-picker v-model="form.trainingStartTime" type="datetime" style="width: 525px"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="trainingEndTime" class="full-width">
          <el-date-picker v-model="form.trainingEndTime" type="datetime" style="width: 525px"></el-date-picker>
        </el-form-item>
        <el-form-item label="培训地点" prop="trainingLocation" class="full-width">
          <el-input v-model="form.trainingLocation"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 报名表单对话框 -->
    <el-dialog title="报名信息" :visible.sync="signUpDiagVisible" width="50%" :before-close="handleClose">
      <!-- 学生信息 -->
      <el-form ref="form" :rules="signUpRules" :inline="false" :model="signUpForm" label-width="120px">
        <el-form-item label="学生姓名" prop="name" class="full-width">
          <el-input placeholder="请填写姓名" v-model="signUpForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" class="full-width">
          <el-radio-group v-model="signUpForm.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age" class="full-width">
          <el-input placeholder="请填写年龄" v-model="signUpForm.age" type="number"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" class="full-width">
          <el-input placeholder="请填写联系电话" v-model="signUpForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email" class="full-width">
          <el-input placeholder="请填写电子邮箱" v-model="signUpForm.email"></el-input>
        </el-form-item>
        <el-form-item label="所属公司名称" prop="company" class="full-width">
          <el-input placeholder="请填写公司名称" v-model="signUpForm.company"></el-input>
        </el-form-item>
        <el-form-item label="工作岗位" prop="position" class="full-width">
          <el-select v-model="signUpForm.position" placeholder="请选择工作岗位">
            <el-option label="软件工程师" value="软件工程师"></el-option>
            <el-option label="数据分析师" value="数据分析师"></el-option>
            <el-option label="质量保证工程师" value="质量保证工程师"></el-option>
            <el-option label="产品经理" value="产品经理"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技术水平" prop="level" class="full-width">
          <el-select v-model="signUpForm.level" placeholder="请选择技术水平">
            <el-option label="萌新" value="萌新"></el-option>
            <el-option label="小成" value="小成"></el-option>
            <el-option label="高手" value="高手"></el-option>
            <el-option label="神" value="神"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请理由" prop="reason" class="full-width">
          <el-input type="textarea" placeholder="请填写申请理由" v-model="signUpForm.reason" :rows="4"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="signUpSubmit">提交</el-button>
      </span>
    </el-dialog>

    <div class="manage-header">
      <el-form :inline="true" :model="filter">
        <el-form-item label="筛选">
          <el-switch v-model="filter.showSelected" active-text="已选课程" inactive-text="未选课程"
            @change="handleFilterChange"></el-switch>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入课程筛选信息" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格内容 -->
    <div class="common-table">
      <el-table :data="filteredCourses" style="width: 100%" height="90%" stripe>
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="teacher" label="讲师"></el-table-column>
        <el-table-column prop="trainingStartTime" label="起始时间"></el-table-column>
        <el-table-column prop="trainingEndTime" label="结束时间"></el-table-column>
        <el-table-column prop="trainingLocation" label="地点"></el-table-column>
        <el-table-column prop="cost" label="培训费用(￥)"></el-table-column>
        <el-table-column prop="status" label="课程状态">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.selected" @click="selectCourse(scope.row)" type="primary"
              size="mini">报名</el-button>
            <el-button v-else @click="deselectCourse(scope.row)" type="danger" size="mini">退选</el-button>
            <el-button @click="viewCourse(scope.row)" type="success" size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourse } from "../api";
export default {
  data() {
    return {
      // 课程对话框的显示与否
      dialogVisible: false,
      // 课程的属性
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
        trainingContent: "",
        trainingStartTime: "",
        trainingEndTime: "",
        trainingLocation: "",
      },
      // 课程的rules
      rules: {
        name: [{ required: false, message: "请输入课程名" }],
        company: [{ required: false, message: "请输入软件公司" }],
        executor: [{ required: false, message: "请输入执行人姓名" }],
        cost: [{ required: false, message: "请输入培训费用" }],
        plan: [{ required: false, message: "请输入培训计划" }],
        instructorName: [{ required: false, message: "请输入讲师姓名" }],
        instructorTitle: [{ required: false, message: "请输入职称" }],
        instructorField: [{ required: false, message: "请输入擅长领域" }],
        instructorEmail: [{ required: false, message: "请输入Email" }],
        instructorPhone: [{ required: false, message: "请输入电话" }],
        trainingContent: [{ required: false, message: "请输入培训内容" }],
        trainingTime: [{ required: false, message: "请选择培训时间" }],
        trainingLocation: [{ required: false, message: "请输入培训地点" }],
      },

      // 报名表单的显示与否
      signUpDiagVisible: false,
      // 报名表单的属性
      signUpForm: {
        name: "",
        sex: "",
        age: "",
        phone: "",
        email: "",
        company: "",
        position: "",
        level: "",
        reason: "",
      },
      // 报名表单的rules
      signUpRules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true, message: "请选择性别" }],
        age: [{ required: true, message: "请输入年龄" }],
        phone: [{ required: true, message: "请输入联系电话" }],
        email: [{ required: true, message: "请输入Email" }],
        company: [{ required: true, message: "请输入公司名称" }],
        position: [{ required: true, message: "请选择工作岗位" }],
        level: [{ required: true, message: "请选择技术水平" }],
        reason: [{ required: true, message: "请输入申请理由" }],
      },
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
      courses: [],
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
      // TODO: 处理筛选条件变化的逻辑
    },

    // 课程报名
    selectCourse(course) {
      this.signUpDiagVisible = true;
      // course.selected = true;
    },

    // 课程退选
    deselectCourse(course) {
      course.selected = false;
      // TODO: 状态存到数据库中
      this.$message(`退选成功: ${course.courseName}`);
    },

    // 查看课程信息
    viewCourse(course) {
      this.dialogVisible = true;
      // 注意需要对当前行数据进行深拷贝，否则会出错
      this.form = this.courses.find((item) => item.id === course.id);
    },

    // 提交报名
    signUpSubmit() {
      // TODO: 提交报名表单
      this.signUpDiagVisible = false;
    },

    getStatusType(status) {
      switch (status) {
        case "未开始":
          return "info";
        case "进行中":
          return "success";
        case "已结束":
          return "danger";
        default:
          return "";
      }
    },

    // 弹窗关闭时
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
      this.signUpDiagVisible = false;
    },

    // 选择页码的回调函数
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },

    onSubmit() {
      // TODO: 处理查询逻辑
      console.log("查询:", this.userForm.name);
    },

    // 刷新
    refresh() {
      location.reload(); // 此为刷新指令
      console.log("刷新");
    },

    // 获取课程信息
    getList() {
      // 获取的列表的数据
      // TODO: 应该不是getCourse，而是另一个获取课程的接口
      getCourse({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          this.courses = data.list;
          this.total = data.count || 0;
        }
      );
    },
  },
  mounted() {
    this.getList();
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

<!-- 使禁用的input颜色与不禁用一致 -->
<style lang="less" scoped>
.el-input.is-disabled /deep/ .el-input__inner {
  color: #606266;
  background-color: #f8f8f8;
}
</style>