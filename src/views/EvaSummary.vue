<!-- 课程评价调查汇总 -->
<template>
    <div class="evaluationSummary">
        <div class="manage-header">
            <el-select v-model="value" placeholder="课程筛选" :inline="true" @change="func">
                <el-option v-for="course in courses" :key="course.name" :label="course.name"
                    :value="course.id"></el-option>
            </el-select>
        </div>

        <!-- 评价表内容 -->
        <el-form label-width="70px" :inline="true" class="summary-form" :model="form" :rules="rules" ref="form">
            <h3 class="title">课程学员评价汇总</h3>
            <el-divider>评分信息</el-divider>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="课程名称" prop="name" class="full-width">
                        <el-input v-model="form.courseName"></el-input>
                    </el-form-item>
                    <el-form-item label="课程均分" prop="company" class="full-width">
                        <el-rate v-model="form.aveCourseScore" disabled show-score text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="讲师姓名" prop="instructorName" class="full-width">
                        <el-input v-model="form.teacherName"></el-input>
                    </el-form-item>
                    <el-form-item label="讲师均分" prop="executor" class="full-width">
                        <el-rate v-model="form.aveTeacherScore" disabled show-score text-color="#ff9900"
                            score-template="{value}">
                        </el-rate>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider>学员意见与建议</el-divider>
            <el-form-item label="学员评价" prop="company" class="full-width" v-for="opinion in this.form.opinions"
                :key="opinion.id">
                <el-input v-model="opinion.text" type="textarea" :rows="3" style="width: 600px;"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            courses: [],

            // 表单信息
            form: {
                courseName: '课程名称',
                aveCourseScore: 1.5,
                teacherName: '讲师名称',
                aveTeacherScore: 1.5,
                opinions: [
                    { id: 0, text: "好" },
                    { id: 1, text: "不好" },
                ],
            },

            // 学员评价列表:列表里都是evaluation
            evaluations: [],

            // evaluation示例
            evaluation: {
                teacherScore: 0,
                courseScore: 0,
                opinion: '',
            },

            rules: {

            },

            userForm: {
                name: "",
            },
        };
    },
    methods: {
        // 根据课程id生成课程评价汇总
        setFormInfo() {
            var ats = 0, acs = 0
            for (var eva in this.evaluations) {
                ats += eva.teacherScore
                acs += eva.courseScore
            }
            this.form.aveTeacherScore = ats / this.evaluations.length
            this.form.aveCourseScore = acs / this.evaluations.length
        },

        // 搜索
        onSubmit() {

        },

        // 刷新
        refresh() {

        },


    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
.summary-form {
    width: 800px;
    border: 1px solid #eaeaea;
    margin: 50px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 15px #cac6c6;
    box-sizing: border-box;

    .title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }

    .el-input {
        width: 250px;
        padding-right: 30px;
    }


}
</style>

<!-- 使禁用的input颜色与不禁用一致 -->
<style lang="less" scoped>
.el-input.is-disabled /deep/ .el-input__inner {
    color: #606266;
    background-color: #f8f8f8;
}

// .el-input.is-disabled /deep/ textarea:disabled {
//     color: #606266;
//     background-color: #f8f8f8;
// }

.el-input.is-disabled /deep/ .el-textarea__inner {
    color: #606266 !important;
}
</style>