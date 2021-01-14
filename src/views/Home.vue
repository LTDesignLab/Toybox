<template>
  <div class="home page-container">
    <CircleProgress 
      :single="true"
      :percentage="84" 
      :progressColor="'#00bbbb'"
      :ringColor="'rgba(0,0,0,0.05)'" 
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
  },
  data() {
    return {
      options: {
        loopHorizontal: false,
        scrollingSpeed: 1000,
        slidesNavigation: false,
        controlArrows: false,
        navigation: true,
        fadingEffect: true,
        navigationPosition: 'left',
        navigationTooltips: ['CircleProgress.vue','Section 2', 'Section 3', 'Section 4','Section 5','Section 6'],
        showActiveTooltip: true,
        easingcss3: 'cubic-bezier(0.65, 0, 0.35, 1)', //swoopy
        onLeave: (origin, destination, direction) => {
          console.log(origin, destination, direction);
        },
        onSlideLeave: (origin, destination, direction) => {
          console.log(origin, destination, direction);
        }
      },
    }
  }
}
</script>

<style lang="scss" scoped>

.page-container {
  z-index: -1;
  position: absolute;
  top: 0px;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>