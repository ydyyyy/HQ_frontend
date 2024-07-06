<!-- 学生选课界面 -->
<template>
  <div class="manage">
    <!-- 查询课程信息对话框 -->
    <el-dialog
      title="课程信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 课程表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="课程名" prop="name" class="full-width">
          <el-input v-model="form.name"></el-input>
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
          <el-input
            type="textarea"
            :rows="8"
            style="width: 525px; height: 200px"
            v-model="form.plan"
          ></el-input>
        </el-form-item>

        <!-- 讲师资料 -->
        <el-divider>讲师资料</el-divider>
        <el-form-item label="姓名" prop="instructorName" class="full-width">
          <el-input v-model="form.teacher"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="instructorTitle" class="full-width">
          <el-input v-model="form.teacherTitle"></el-input>
        </el-form-item>
        <el-form-item
          label="擅长领域"
          prop="instructorField"
          class="full-width"
        >
          <el-input v-model="form.teacherField"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="instructorEmail" class="full-width">
          <el-input v-model="form.teacherEmail"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="instructorPhone" class="full-width">
          <el-input v-model="form.teacherPhone"></el-input>
        </el-form-item>
        <el-form-item
          label="培训内容"
          prop="trainingContent"
          class="large-width"
        >
          <el-input
            type="textarea"
            :rows="4"
            style="width: 525px; height: 100px"
            v-model="form.trainingContent"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="开始时间"
          prop="trainingStartTime"
          class="full-width"
        >
          <el-date-picker
            v-model="form.trainingStartTime"
            type="datetime"
            style="width: 525px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="结束时间"
          prop="trainingEndTime"
          class="full-width"
        >
          <el-date-picker
            v-model="form.trainingEndTime"
            type="datetime"
            style="width: 525px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="培训地点"
          prop="trainingLocation"
          class="full-width"
        >
          <el-input v-model="form.trainingLocation"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 评价表单对话框 -->
    <el-dialog
    title="课程评价"
    :visible.sync="evaluationDialogVisible"
    width="50%"
    :before-close="handleCloseOfEvaluation"
  >
    <el-form
      ref="evaluationForm"
      :rules="evaluationRules"
      :inline="false"
      :model="evaluationForm"
      label-width="120px"
    >
      <!-- 课程名称 -->
      <el-form-item label="课程名称" prop="courseName" class="full-width">
        <el-input v-model="evaluationForm.courseName" disabled></el-input>
      </el-form-item>

      <!-- 学员信息 -->
      <el-divider>学员信息</el-divider>
      <el-form-item label="学员姓名" prop="studentName" class="full-width">
        <el-input v-model="evaluationForm.studentName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" class="full-width">
        <el-radio-group v-model="evaluationForm.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email" class="full-width">
        <el-input v-model="evaluationForm.email"></el-input>
      </el-form-item>

      <!-- 评价内容 -->
      <el-divider>评价内容</el-divider>
      <el-form-item label="讲师评价" prop="instructorFeedback" class="full-width">
        <el-rate v-model="evaluationForm.instructorFeedback"></el-rate>
      </el-form-item>
      <el-form-item label="培训满意度" prop="trainingSatisfaction" class="full-width">
        <el-rate v-model="evaluationForm.trainingSatisfaction"></el-rate>
      </el-form-item>
      <el-form-item label="意见和建议" prop="comments" class="full-width">
        <el-input
          type="textarea"
          v-model="evaluationForm.comments"
          :rows="4"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloseOfEvaluation">取消</el-button>
      <el-button type="primary" @click="submitEvaluation">提交</el-button>
    </span>
  </el-dialog>

    <div class="manage-header">
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

    <!-- 表格内容 -->
    <div class="common-table">
      <el-table :data="courses" style="width: 100%" height="740px" stripe>
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="teacher" label="讲师"></el-table-column>
        <el-table-column
          prop="trainingStartTime"
          label="起始时间"
        ></el-table-column>
        <el-table-column
          prop="trainingEndTime"
          label="结束时间"
        ></el-table-column>
        <el-table-column prop="trainingLocation" label="地点"></el-table-column>
        <el-table-column prop="cost" label="培训费用(￥)"></el-table-column>
        <el-table-column prop="status" label="课程状态">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.statusOfEva)">
              {{ scope.row.statusOfEva }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              @click="selectCourse(scope.row)"
              type="primary"
              size="mini"
              >评价</el-button
            >
            <el-button @click="viewCourse(scope.row)" type="success" size="mini"
              >查看</el-button
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
      evaluationDialogVisible: false,
      // 报名表单的属性
      evaluationForm: {
        courseName: 'Vue.js 前端开发培训', // 示例课程名称
        studentName: '',
        sex: '',
        email: '',
        instructorFeedback: 0,
        trainingSatisfaction: 0,
        comments: '',
      },
      // 报名表单的rules
      evaluationRules: {
        studentName: [{ required: true, message: '请输入学员姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }],
        instructorFeedback: [{ required: true, message: '请对讲师进行评价', trigger: 'change' }],
        trainingSatisfaction: [{ required: true, message: '请对培训满意度进行评价', trigger: 'change' }],
        comments: [{ required: true, message: '请输入意见和建议', trigger: 'blur' }],
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
  methods: {
    // 课程评价
    selectCourse(course) {
      this.evaluationDialogVisible = true;
    },

    // 查看课程信息
    viewCourse(course) {
      this.dialogVisible = true;
      // 注意需要对当前行数据进行深拷贝，否则会出错
      this.form = this.courses.find((item) => item.id === course.id);
    },

    // 提交评价
    submitEvaluation() {
      this.$refs.evaluationForm.validate((valid) => {
        if (valid) {
          console.log(this.evaluationForm);
          this.$message.success('评价提交成功！');
        } else {
          this.$message.error('请完成表单后再提交');
          return false;
        }
        if (this.$refs.evaluationForm) {
        this.$refs.evaluationForm.resetFields();
       }
       this.evaluationDialogVisible = false;
      });
    },

    getStatusType(status) {
      switch (status) {
        case "已评价":
          return "success";
        case "未评价":
          return "danger";
        default:
          return "";
      }
    },

    // 弹窗关闭时
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleCloseOfEvaluation() {
      this.$refs.evaluationForm.resetFields();
      this.evaluationDialogVisible = false;
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
