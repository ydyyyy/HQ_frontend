<!-- 课程评价调查汇总 -->
<template>
    <div class="companySummary">
        <!-- 课程信息对话框 -->
        <el-dialog title="课程信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <!-- 课程表单信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="100px">

            </el-form>
        </el-dialog>

        <!-- 汇总报表主体 -->
        <el-form label-width="90px" :inline="true" class="summary-form" :model="form" :rules="rules" ref="form">
            <h3 class="title">浩奇培训公司汇总报表</h3>
            <el-divider>统计时间段</el-divider>
            <el-form-item label="选择时间" prop="name" class="full-width">
                <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期" :unlink-panels="true" style="margin-right: 50px;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="" prop="company" class="full-width">
                <el-button type="primary" @click="func">确认</el-button>
            </el-form-item>

            <el-divider>收入统计</el-divider>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="总收入" prop="company" class="full-width">
                        <el-input v-model="form.toset" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="培训费收入" prop="company" class="full-width">
                <el-input v-model="form.toset" disabled></el-input>
            </el-form-item>
            <el-form-item label="其他收入" prop="company" class="full-width">
                <el-input v-model="form.toset" disabled></el-input>
            </el-form-item>

            <el-divider>开设课程</el-divider>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="培训学员数" prop="company" class="full-width">
                        <el-input v-model="form.toset" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="已结束课程" prop="company" class="full-width">
                <el-button type="primary" @click="showDiaglog('finished')">（显示数量）</el-button>
            </el-form-item>
            <el-form-item label="进行中课程" prop="company" class="full-width">
                <el-button type="primary" @click="showDiaglog('started')">（显示数量）</el-button>
            </el-form-item>
            <el-form-item label="未开始课程" prop="company" class="full-width">
                <el-button type="primary" @click="showDiaglog('not started')">（显示数量）</el-button>
            </el-form-item>

            <el-divider>执行人工作情况</el-divider>
            //用v-for展示每个执行人的情况
            <div style="border:2px solid;border-radius: 5px;padding-top: 20px; color:cadetblue">
                <el-form-item label="姓名" prop="company" class="full-width">
                    <el-input v-model="form.toset" disabled></el-input>
                </el-form-item>
                <el-form-item label="负责课程" prop="company" class="full-width">
                    <el-input v-model="form.toset" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="company" class="full-width">
                    <el-input v-model="form.toset" type="textarea" :rows="3" style="width: 630px;" disabled></el-input>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,

            dateRange: [],

            // 表单信息
            form: {
                toset: '占位'
            },

            rules: {

            },
        };
    },
    methods: {
        func() {

        },

        showDiaglog(status) {
            this.dialogVisible = true
            // 根据status显示不同状态的课程列表
        },

        handleClose() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        },
    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
.summary-form {
    width: 1000px;
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
</style>