<!-- 课程评价调查汇总 -->
<template>
    <div class="evaluationSummary">
        <div class="manage-header">
            <el-select v-model="value" placeholder="课程筛选" :inline="true">
                <el-option v-for="course in courses" :key="course.name" :label="course.name"
                    :value="course.id"></el-option>
            </el-select>
        </div>

        <!-- 评价表内容 -->
        <div class="common-table">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="100px">
                <el-divider>评分信息</el-divider>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="课程名称" prop="name" class="full-width">
                            <el-input v-model="form.courseName"></el-input>
                        </el-form-item>
                        <el-form-item label="课程均分" prop="company" class="full-width">
                            <el-input v-model="form.aveCourseScore"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="讲师姓名" prop="instructorName" class="full-width">
                            <el-input v-model="form.teacherName"></el-input>
                        </el-form-item>
                        <el-form-item label="讲师均分" prop="executor" class="full-width">
                            <el-input v-model="form.aveTeacherScore"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-divider>学员意见与建议</el-divider>
                <el-form-item label="学员评价" prop="company" class="full-width" v-for="opinion in this.form.opinions"
                    :key="opinion.id">
                    <el-input v-model="opinion.text" type="textarea" :rows="3"></el-input>
                </el-form-item>

            </el-form>
        </div>
        <div class="common-table"></div>
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
                aveCourseScore: 0,
                teacherName: '讲师名称',
                aveTeacherScore: 0,
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