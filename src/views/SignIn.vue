<template>
  <div class="manage">
    <div class="manage-header">
      <el-select v-model="value" placeholder="课程筛选">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- form搜索区域 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input
            placeholder="请输入筛选信息"
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
      <el-table :data="tableData" style="width: 100%" height="740px" stripe>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="company" label="公司名称"></el-table-column>
        <el-table-column prop="position" label="工作岗位"></el-table-column>
        <el-table-column
          prop="email"
          label="Email"
          width="280"
        ></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.statusOfSign)">
              {{ scope.row.statusOfSign }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="control" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleSignIn(scope.row)"
              >签到</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, editUser, delUser } from "../api";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      dialogVisible: false,
      form: {
        name: "",
        sex: "",
        company: "",
        position: "",
        level: "",
        email: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true, message: "请选择性别" }],
        company: [{ required: true, message: "请输入公司名称" }],
        position: [{ required: true, message: "请选择工作岗位" }],
        level: [{ required: true, message: "请选择技术水平" }],
        email: [{ required: true, message: "请输入Email" }],
      },
      tableData: [],
      total: 0, // 当前总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    // 弹窗关闭时
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
    },
    handleSignIn(row) {
      this.$message(`签到: ${row.name}`);
      // 添加签到逻辑
    },
    getList() {
      // 获取的列表的数据
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          this.tableData = data.list;
          this.tableData = data.list.map((item) => ({
            ...item,
            sex: item.sex == 1 ? "男" : "女",
          }));
          this.total = data.count || 0;
        }
      );
    },
    refresh() {
      this.userForm.name = "";
      this.getList();
    },
    // 选择页码的回调函数
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },
    // 列表的查询
    onSubmit() {
      this.getList();
    },
    getStatusType(status) {
      switch (status) {
        case "未签到":
          return "danger";
        case "已签到":
          return "success";
        default:
          return "";
      }
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
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
