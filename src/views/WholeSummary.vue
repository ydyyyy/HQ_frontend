<!-- 课程评价调查汇总 -->
<template>
    <div class="evaluationSummary">
        <div class="summary-form">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="100px">
                <h1>浩奇培训公司汇总报表</h1>
                <el-divider>统计时间段</el-divider>
                <el-form-item label="统计开始时间" prop="name" class="full-width">
                    <el-input v-model="form.toset"></el-input>
                </el-form-item>
                <el-form-item label="统计截止时间" prop="company" class="full-width">
                    <el-input v-model="form.toset"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="company" class="full-width">
                    <el-button type="primary" @click="func">确认</el-button>
                </el-form-item>

                <el-divider>收入统计</el-divider>
                <el-form-item label="总收入" prop="company" class="full-width">
                    <el-input v-model="form.toset"></el-input>
                </el-form-item>
                <el-form-item label="培训费收入" prop="company" class="full-width">
                    <el-input v-model="form.toset"></el-input>
                </el-form-item>
                <el-form-item label="其他收入" prop="company" class="full-width">
                    <el-input v-model="form.toset"></el-input>
                </el-form-item>

                <el-divider>开设课程</el-divider>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="培训学员数" prop="company" class="full-width">
                            <el-input v-model="form.toset"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="已结束的课程" prop="company" class="full-width">
                    <el-button type="primary" @click="func">（显示数量）</el-button>
                </el-form-item>
                <el-form-item label="进行中的课程" prop="company" class="full-width">
                    <el-button type="primary" @click="func">（显示数量）</el-button>
                </el-form-item>
                <el-form-item label="未开始的课程" prop="company" class="full-width">
                    <el-button type="primary" @click="func">（显示数量）</el-button>
                </el-form-item>
                //按钮打开一个对话框，里面是表格？

                <el-divider>执行人工作情况</el-divider>
                <el-form-item label="姓名" prop="company" class="full-width">
                    <el-input v-model="form.toset"></el-input>
                </el-form-item>
                <el-form-item label="负责课程" prop="company" class="full-width">
                    <el-input v-model="form.toset"></el-input>
                </el-form-item>
                <el-form-item label="其他收入" prop="company" class="full-width">
                    <el-input v-model="form.toset"></el-input>
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
        func() {

        },

    },
    mounted() {

    },
}
</script>