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
  import utils from '../utils'

  export default {
    props: ['task'],
    computed: {
      // startTime () {
      //   return moment(this.task.start).format('LTS')
      // },
      // endTime () {
      //   return moment(this.task.end).format('LTS')
      // },
      duration () {
        return utils.formatHour(this.task.duration)
      }
    }
  }
</script>
