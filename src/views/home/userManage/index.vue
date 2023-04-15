<template>
    <div class="container">
        <NavTopBar title="用户管理" :leftArrow="true" :rightArrow="true" />
        <van-cell-group>
            <van-cell v-for="(student, index) in showStudents" :key="index" title="用户名" :value="student.username" @click="showStudentDetail(student)">
                <template #label>
                    <div>姓名：{{ student.realName || '无' }}</div>
                    <div>班级：{{ student.class || '无'}}</div>
                    <div>学号：{{ student.schoolNumber || '无'}}</div>
                </template>
            </van-cell>
        </van-cell-group>
        <div class="page__wrapper ">
            <van-pagination v-model="currentPage" :total-items="total" :show-page-size="5" :items-per-page="5" @change="change">
                <template #prev-text>
                    <van-icon name="arrow-left" />
                </template>
                <template #next-text>
                    <van-icon name="arrow" />
                </template>
                <template #page="{ text }">{{ text }}</template>
            </van-pagination>
        </div>
        <van-dialog v-model="showStudentDialog" title="修改学生信息" show-cancel-button @confirm="confirm">
            <van-field v-model="currentStudent.realName" label="姓名" placeholder="请输入姓名"/>
            <van-field v-model="currentStudent.class" label="班级" placeholder="请输入班级"/>
            <van-field v-model="currentStudent.schoolNumber" label="学号" placeholder="请输入学号"/>
            <van-field v-model="currentStudent.periodNumber" label="期" placeholder="请输入期" type="number"/>
            <van-field v-model="currentStudent.buildingNumber" label="栋" placeholder="请输入栋" type="number"/>
            <van-field v-model="currentStudent.unitNumber" label="单元" placeholder="请输入单元" type="number"/>
            <van-field v-model="currentStudent.layerNumber" label="层" placeholder="请输入层" type="number"/>
            <van-field v-model="currentStudent.householdNumber" label="户" placeholder="请输入户" type="number"/>
        </van-dialog>
    </div>
</template>

<script>
import NavTopBar from "@/components/NavTopBar";
import { getAllUserInfo,updateVIPUserInfo } from '@/api/test'

export default {
    components: {
        NavTopBar
    },
    data() {
        return {
            currentPage: 1,
            students: [],
            showStudents: [],
            currentStudent: {},
            showStudentDialog: false,
            total: 1,
        }
    },
    mounted(){
        getAllUserInfo().then(res => {
            this.students = res.result
            this.total = Math.ceil(this.students.length)
            this.showStudents = this.students.slice(0,5)
        })
    },
    methods: {
        change(page){
            let data = this.students.slice(5*(page-1),5*page)
            this.showStudents = {...data}
        },
        showStudentDetail(student){
            this.currentStudent = student;
            this.showStudentDialog = true;
        },
        confirm(){
            const data = {
                id: this.currentStudent.id,
                realName: this.currentStudent.realName,
                class: this.currentStudent.class,
                schoolNumber: this.currentStudent.schoolNumber,
                periodNumber: this.currentStudent.periodNumber,
                buildingNumber: this.currentStudent.buildingNumber,
                unitNumber: this.currentStudent.unitNumber,
                layerNumber: this.currentStudent.layerNumber,
                householdNumber: this.currentStudent.householdNumber,
            }
            updateVIPUserInfo(data).then(res => {
                if(res.status === 0) this.$toast.success('修改成功！')
                else this.$toast.error(res.message)
            })
        },
    },
}
</script>

<style lang="less" scoped>
.container{
    width:100%;
    background-color: #fff;
}
.page__wrapper {
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
}
</style>