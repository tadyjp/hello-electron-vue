<style scoped>
  .task-left {
    flex: 1;
    line-height: 40px;
    padding: 5px;
  }
  .task-right {
    width: 80px;
    line-height: 50px;
    text-align: right;
  }
</style>

<template>
  <div class="task-card" :data-task-id="task.id">
    <div class="task-left">{{task.name}}</div>
    <div class="task-right">{{duration}}</div>
  </div>
</template>

<script>
  import moment from 'moment'
  import utils from '../utils'

  export default {
    props: ['task'],
    data () {
      return {
        duration: utils.formatHour(this.task.duration + (moment().unix() - this.task.start))
      }
    },
    mounted () {
      setInterval(() => {
        this.duration = utils.formatHour(this.task.duration + (moment().unix() - this.task.start))
      }, 1000 / 60)
    }
  }
</script>
