<!-- 学生选课界面 -->

<template>
    <div class="manage">
        <!-- 查询课程信息对话框 -->
        <el-dialog title="课程信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <!-- 课程表单信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="courseData" label-width="100px">
                <el-form-item label="课程名" prop="name" class="full-width">
                    <el-input placeholder="无课程名" v-model="courseData.name"></el-input>
                </el-form-item>
                <el-form-item label="软件公司" prop="company" class="full-width">
                    <el-input placeholder="无软件公司" v-model="courseData.company"></el-input>
                </el-form-item>
                <el-form-item label="执行人" prop="executor" class="full-width">
                    <el-input placeholder="无执行人姓名" v-model="courseData.executor"></el-input>
                </el-form-item>
                <el-form-item label="培训费用" prop="cost" class="full-width">
                    <el-input placeholder="无培训费用" v-model="courseData.cost"></el-input>
                </el-form-item>
                <el-form-item label="培训计划" prop="plan" class="large-width">
                    <el-input type="textarea" :rows="8" style="width: 525px; height: 200px;" placeholder="请输入培训计划"
                        v-model="courseData.plan"></el-input>
                </el-form-item>

                <!-- 讲师资料 -->
                <el-divider>讲师资料</el-divider>
                <el-form-item label="姓名" prop="instructorName" class="full-width">
                    <el-input placeholder="请输入讲师姓名" v-model="courseData.teacher"></el-input>
                </el-form-item>
                <el-form-item label="职称" prop="instructorTitle" class="full-width">
                    <el-input placeholder="请输入职称" v-model="courseData.teacherTitle"></el-input>
                </el-form-item>
                <el-form-item label="擅长领域" prop="instructorField" class="full-width">
                    <el-input placeholder="请输入擅长领域" v-model="courseData.teacherField"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="instructorEmail" class="full-width">
                    <el-input placeholder="请输入Email" v-model="courseData.teacherEmail"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="instructorPhone" class="full-width">
                    <el-input placeholder="请输入电话" v-model="courseData.teacherPhone"></el-input>
                </el-form-item>
                <el-form-item label="培训内容" prop="trainingContent" class="large-width">
                    <el-input type="textarea" :rows="4" style="width: 525px; height: 100px;" placeholder="请输入培训内容"
                        v-model="courseData.trainingContent"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="trainingStartTime" class="full-width">
                    <el-date-picker v-model="courseData.trainingTime" type="datetime" placeholder="选择日期和时间"
                        style="width: 525px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="trainingEndTime" class="full-width">
                    <el-date-picker v-model="courseData.trainingTime" type="datetime" placeholder="选择日期和时间"
                        style="width: 525px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="培训地点" prop="trainingLocation" class="full-width">
                    <el-input placeholder="请输入培训地点" v-model="courseData.trainingLocation"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose">确定</el-button>
            </span>
        </el-dialog>

        <!-- 报名表单对话框 -->
        <el-dialog title="表单填写" :visible.sync="signUpDiagVisible" width="50%" :before-close="handleClose">
            <!-- 学生信息? -->
            <el-form ref="form" :rules="rules" :inline="true" :model="signUpForm" label-width="100px">
                <el-form-item label="学生姓名" prop="name" class="full-width">
                    <el-input placeholder="请填写姓名" v-model="signUpForm.name"></el-input>
                </el-form-item>
                <!-- TODO: 报名表单的其他属性 -->
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="signUpSubmit">确认</el-button>
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
                <el-table-column prop="trainingTime" label="时间" width="250"></el-table-column>
                <el-table-column prop="trainingLocation" label="地点"></el-table-column>
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
import { courseData, courseStatus } from '../utils/dataType'
export default {
    data() {
        return {
            // 课程对话框的显示与否
            dialogVisible: false,
            // 课程的属性
            courseData: courseData,
            // 课程的rules
            rules: {
                name: [{ required: false, message: '请输入课程名' }],
                company: [{ required: false, message: '请输入软件公司' }],
                executor: [{ required: false, message: '请输入执行人姓名' }],
                cost: [{ required: false, message: '请输入培训费用' }],
                plan: [{ required: false, message: '请输入培训计划' }],
                instructorName: [{ required: false, message: '请输入讲师姓名' }],
                instructorTitle: [{ required: false, message: '请输入职称' }],
                instructorField: [{ required: false, message: '请输入擅长领域' }],
                instructorEmail: [{ required: false, message: '请输入Email' }],
                instructorPhone: [{ required: false, message: '请输入电话' }],
                trainingContent: [{ required: false, message: '请输入培训内容' }],
                trainingTime: [{ required: false, message: '请选择培训时间' }],
                trainingLocation: [{ required: false, message: '请输入培训地点' }],
            },

            // 报名表单的显示与否
            signUpDiagVisible: false,
            // 报名表单的属性
            signUpForm: {
                name: '',
                // TODO 属性补充
            },
            // 报名表单的rules
            signUpRules: {
                name: [{ required: true, message: '请输入姓名' }],
                // TODO: 表单的rules补充
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
                    selected: true,
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
            this.form = JSON.parse(JSON.stringify(course));
        },

        // 提交报名
        signUpSubmit() {
            // TODO: 提交报名表单
            this.signUpDiagVisible = false;
        },

        getStatusType(status) {
            switch (status) {
                case courseStatus.UNSTART:
                    return "info";
                case "已满员":
                    return "warning";
                case courseStatus.START:
                    return "success";
                case courseStatus.FINISH:
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
