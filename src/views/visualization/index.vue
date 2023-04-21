<template>
  <div class="sss">
    <div class="header">
    </div>
    <div class="info">
      <p class="title">
        <i></i>
        {{ $t('visual.病毒信息') }}
      </p>
      <div class="content">
        <p>{{ Ncovinfo.note1 }}</p>
        <p>{{ Ncovinfo.note2 }}</p>
        <p>{{ Ncovinfo.note3 }}</p>
        <p>{{ Ncovinfo.mark1 }}</p>
        <p>{{ Ncovinfo.mark2 }}</p>
        <p>{{ Ncovinfo.mark3 }}</p>
      </div>
    </div>
    <Ncovdata/>
    <Map/>
  </div>
</template>

<script>
import { getNcovinfo } from '@/api/test'
import Ncovdata from './Ncovdata.vue'
import Map from './Map.vue'

export default {
  name: 'Visualization',
  components:{
    Ncovdata,
    Map
  },
  data () {
    return {
      Ncovinfo: {}
    }
  },
  mounted () {
    getNcovinfo().then(res => {
      this.Ncovinfo = res.result
    })
  }
}
</script>

<style lang="less" scoped>
.sss{
  overflow-y: auto;// 实现纵向滑动
  padding-bottom: 60px;
}
.header{
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 33.5%;
  background: url(../../assets/yiqing.png) no-repeat;
  background-size: cover;
}
.info{
  margin:0;
  width: 100%;
  // background-color: #bfa;
  .title{
    font-size: 18px;
    margin: 7px 0;
  }
  i{
    width: 6px;
    height: 20px;
    margin-right: 3px;
    margin-left: 10px;
    display: inline-block;
    vertical-align: middle;
    background-color: #4169e2;
  }
  .content{
    font-size: 10px;
    padding: 0 20px;
  }
}
</style>
