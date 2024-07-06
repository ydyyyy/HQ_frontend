<template>
    <div>
      <el-table :data="applications" style="width: 100%" >
        <el-table-column prop="id" label="申请ID" width="180" />
        <el-table-column prop="name" label="申请人姓名" />
        <el-table-column prop="company" label="公司" />
        <el-table-column prop="date" label="申请日期" />
        <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag :type="getStatusType(scope.row.status)">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="viewApplication(scope.row)">查看</el-button>
            <el-button size="mini" type="success" @click="approveApplication(scope.row)">批准</el-button>
            <el-button size="mini" type="danger" @click="rejectApplication(scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog
    title="申请详情"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="公司名称" prop="company">
        <el-input v-model="form.company" ></el-input>
      </el-form-item>
      <el-form-item label="申请人姓名" prop="applicant">
        <el-input v-model="form.applicant" ></el-input>
      </el-form-item>
      <el-form-item label="培训主题" prop="topic">
        <el-input v-model="form.topic" ></el-input>
      </el-form-item>
      <el-form-item label="培训时间" prop="date">
        <el-input v-model="form.date" ></el-input>
      </el-form-item>
      <el-form-item label="培训内容" prop="content">
        <el-input type="textarea" v-model="form.content" ></el-input>
      </el-form-item>
      <el-form-item label="培训规模(人数)" prop="scale">
        <el-input v-model="form.scale" ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" v-model="form.remarks" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
    </span>
  </el-dialog>
    </div>
  </template>
  
  <script>
import { format } from 'echarts';
  export default {
    data() {
      return {
        applications: [], // 申请列表数据
        dialogVisible: false, // 控制对话框的显示
        currentApplication: {},// 当前查看的申请详情
        form: {
          company: '腾讯公司',
          applicant: '马化腾',
          topic: '王者荣耀技术培训',
          date: '2024年11月6日',
          content: '如何打好王者荣耀',
          scale: 50,
          remarks: '我是马化腾'
        },
      };
    },
    created() {
      this.fetchApplications();
    },
    methods: {
      fetchApplications() {
        // 模拟获取申请列表数据，可以替换为实际的 API 调用BCD
        this.applications = [
          { id: '1', name: '张三', company: 'A公司', date: '2024-01-01', status: '待处理' },
          { id: '2', name: '李四', company: 'B公司', date: '2024-01-02', status: '已批准' },
          { id: '3', name: '王五', company: 'C公司', date: '2024-01-03', status: '已批准' },
          { id: '4', name: '范国祥', company: 'D公司', date: '2024-01-05', status: '待处理' },
          { id: '5', name: '刘六', company: 'E公司', date: '2024-01-06', status: '已批准' },
          { id: '6', name: '刘六', company: 'E公司', date: '2024-01-06', status: '已批准' },
          { id: '7', name: '刘六', company: 'E公司', date: '2024-01-06', status: '待处理' },
          // 更多申请数据
        ];
      },
      viewApplication(application) {
        this.currentApplication = application;
        this.dialogVisible = true;
      },
      approveApplication(application) {
        this.$confirm('确认批准该申请吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          application.status = '已批准';
          this.$message({
            type: 'success',
            message: '申请已批准'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      rejectApplication(application) {
        this.$confirm('确认拒绝该申请吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          application.status = '已拒绝';
          this.$message({
            type: 'success',
            message: '申请已拒绝'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      handleClose() {
        this.dialogVisible = false;
      },
      getStatusType(status) {
        switch (status) {
          case '待处理':
            return 'danger';
          case '已批准':
            return 'success';
            case '已拒绝':
            return 'info';  
          default:
            return '';
        }
    }
    }
  };
  </script>
  
<style scoped>
  .dialog-footer {
    text-align: right;
  }
  .el-input__inner, .el-textarea__inner, .el-input-number__input {
  background-color: #f5f7fa !important; /* 背景颜色 */
  color: #333 !important; /* 文字颜色 */
  font-size: 14px !important; /* 字体大小 */
}

.el-form-item__label {
  font-weight: bold; /* 标签字体加粗 */
  color: #333; /* 标签文字颜色 */
}
</style>
  