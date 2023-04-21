<template>
    <div>
      <van-nav-bar
        :title="$t('home.首页')"
      />
      <rotattion-chart/>
    </div>
</template>

<script>
import RotattionChart from './rotationChart.vue'

export default {
  name: 'Home',
  components:{RotattionChart},
  data () {
    return {

    }
  },
  mounted () {
  },
  methods:{
  },
}
</script>
