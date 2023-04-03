<template>
    <div>
      <van-nav-bar
        title="首页"
        left-text="返回"
        right-text="退出"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="$router.replace({name:'home'})"
      />
      <rotattion-chart/>
    </div>
</template>

<script>
import RotattionChart from './rotationChart.vue'
import { getUserinfo, getNcov } from '@/api/test'

export default {
  name: 'Home',
  components:{RotattionChart},
  data () {
    return {

    }
  },
  mounted () {
    // getUserinfo({'username':'旺仔'}).then(res=>{
    //   console.log(res)
    // })
    // getNcov({ key: '62e34ad34025d5d5127135efa58d4ca8' })
  },
  methods:{
  },
}
</script>
