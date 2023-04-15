<template>
  <div style="width: 100%">
    <nav-top-bar title="健康打卡" :leftArrow="true" :rightArrow="true" />

    <van-form ref="form" :model="clockin" :rules="rules" @failed="onFailed">
      <van-field name="temperature" label="体温">
        <template #input>
          <van-radio-group v-model="clockin.temperature" direction="horizontal">
            <van-radio name="down">37.3℃以下</van-radio>
            <van-radio name="up">37.3℃以上</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="address" label="登记地点">
        <template #input>
          <button class="addressBtn" @click="show = true">
            <van-icon name="location-o"/>
          </button>
          {{ clockin.address }}
          <span style="color:#c8c9cc" v-if="!clockin.address">请选择当前登记地点</span>
          <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-area title="请选择地区" :area-list="areaList" value="address" @cancel="show = false" @confirm="confirm"/>
          </van-popup>
        </template>
      </van-field>
      <van-field name="switch" label="进入高风险区">
        <template #input>
          <van-switch v-model="switchCheckedIsToHighRisk" size="20" style="margin-left:10px" /> <span style="color:#c8c9cc">14天内到访高风险地区</span>
        </template>
      </van-field>

      <van-field v-if="switchCheckedIsToHighRisk" name="高风险地区" label="高风险地区">
        <template #input>
          <button class="addressBtn" @click="highShow = true">
            <van-icon name="location-o"/>
          </button>
          {{ clockin.highAddress }}
          <span style="color:#c8c9cc" v-if="!clockin.highAddress">请选择高风险地区</span>
          <van-popup v-model="highShow" position="bottom" :style="{ height: '50%' }" get-container="body">
            <van-area title="请选择地区" :area-list="areaList" value="address" @cancel="highShow = false" @confirm="highConfirm"/>
          </van-popup>
        </template>
      </van-field>
      <van-field name="uploader" label="上传疫苗接种凭证">
        <template #input>
          <van-uploader v-model="clockin.uploader" :after-read="afterRead"/>
        </template>
      </van-field>
      <van-field disabled v-model="clockin.continuous" name="健康打卡天数" label="健康打卡天数" />
      <van-field disabled v-model="clockin.createTime" name="打卡时间" label="打卡时间" />
      <div style="margin: 16px">
        <van-button round :disabled="onSubmitDisabled" block type="info" @click="onSubmit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import NavTopBar from "@/components/NavTopBar";
import { areaList } from '@vant/area-data';
import { postClockin,getCardDays,getCardMsg } from "@/api/home"
export default {
  name: "TemperatureRegistration",
  components: {
    NavTopBar,
  },
  data() {
    return {
      clockin: {
        username:'',
        temperature: null,
        isToHighRisk: 0,// 0表示高风险地区
        highAddress: "",
        continuous: 0,
        createTime: "",
        address: '',
        uploader: [],
        picture: '',
      },
      rules: {
        temperature: [{ required: true, message: '请选择体温', trigger: 'change' }],
        address: [{ required: true, message: '请选择登记地点', trigger: 'change' }],
        highAddress: [],
      },
      switchCheckedIsToHighRisk: false,
      onSubmitDisabled: false,
      areaList,
      show: false,
      highShow: false, // 是否展示高风险地区
    };
  },
  created() {
    this.rules.highAddress = [
      { 
        required: this.clockin.isToHighRisk ? true : false, 
        message: '请选择高风险地区', 
        trigger: 'change' 
      }
    ];
    // 自动获取上一次打卡的信息
    getCardMsg().then(res => {
      this.clockin = {...this.clockin ,...res.result}
    })
  },
  computed: {
    isChecked() {
      this.switchCheckedIsToHighRisk
        ? (this.clockin.isToHighRisk = 1)
        : (this.clockin.isToHighRisk = 0);
    },
  },
  mounted() {
    // 查询连续登录日期
    this.continuousDay();
    //显示当前日期时间
    this.timer = setInterval(() => {
      this.clockin.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.clockin.picture = file.content
    },
    onSubmit() {
      if (this.clockin.temperature === 'up') {
        this.$dialog.confirm({
          title: '高温预警',
          message: '你的体温异常，是否继续提交',
        })
          .then(() => {
            this.uploadForm();
          })
          // .catch(() => {
          // });
      } else {
        this.uploadForm();
      }
    },
    uploadForm() {
      // this.$refs.form.validate(valid => {
      //   if (valid) {
          // 表单校验通过后执行的操作
          let clockinfo = Object.assign({}, this.clockin);
          delete clockinfo.uploader
          postClockin(clockinfo).then(res => {
            if (res.status == 0) {
              this.$toast.success("打卡成功")
              this.onSubmitDisabled = true
              this.continuousDay();
            } else {
              this.$toast.fail(res.message)
            }
      //     })
      //   } else {
      //     // 校验不通过，可以在这里给出提示信息
      //     this.$toast.fail('校验失败，请检查表单！')
        // }
      })
    },
    continuousDay() {
      getCardDays().then(res => {
        if (res.status === 0) {
          this.clockin.continuous = res.result
        } else {
          this.$toast("查询连续打卡天数失败");
        }
      })
    },
    confirm(val){
      this.show = false;
      let address = ''
      for(let i=0; i<val.length; i++){
        address = address + val[i]['name']
        if(i !== val.length-1) address += '-'
      }
      this.clockin.address = address
    },
    highConfirm(val){
      this.highShow = false;
      let address = ''
      for(let i=0; i<val.length; i++){
        address = address + val[i]['name']
        if(i !== val.length-1) address += '-'
      }
      this.clockin.highAddress = address
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.addressBtn{
  background-color: #fff;
  border: 0;
  font-size: 20px;
}
</style>