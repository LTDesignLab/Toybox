<template>
  <div class="home">
      <CircleProgress 
          :single="true"
          :percentage="84" 
          :progressColor="'#0000ff'"
          :circleColor="'rgba(0,0,0,0.06)'" 
          :strokeWidth="8"
          :showNumber="true"
          :separated="false"
      />
  </div>
</template>

<script>
// @ts-nocheck
import CircleProgress from '@/components/CircleProgress.vue'

export default {
  name: 'Home',
  components: {
    CircleProgress
  }
}
</script>
