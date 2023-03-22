<template>
    <div>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="info">信息按钮</van-button>
        <van-button type="default">默认按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
    </div>
</template>

<script>
import { getUserinfo, getNcov } from '@/api/test'

export default {
  name: 'Home',
  data () {
    return {

    }
  },
  mounted () {
    // getUserinfo({'username':'旺仔'}).then(res=>{
    //   console.log(res)
    // })
    getNcov({ key: '62e34ad34025d5d5127135efa58d4ca8' })
  }
}
</script>
