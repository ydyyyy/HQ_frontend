<!-- 个人中心（仅展示学生） -->
<template>
    <div class="center-form">
        <el-form label-width="70px" :inline="true" class="summary-form" :model="form" :rules="rules" ref="form">
            <h3 class="title">个人中心</h3>
            <el-divider>账号信息</el-divider>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="用户名" prop="name" class="full-width">
                        <el-input v-model="form.toset"></el-input>
                    </el-form-item>
                    <el-form-item label="用户类别" prop="name" class="full-width">
                        <el-input v-model="form.toset"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-divider>用户信息</el-divider>
            <el-form-item label="姓名" prop="company" class="full-width">
                <el-input v-model="form.toset"></el-input>
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
                toset: '占位'
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