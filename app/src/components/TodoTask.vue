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
  form {
    display: inline-block;
    width: 100%;
  }
  input {
    display: inline-block;
    width: 100%;
    line-height: 46px;
  }
</style>

<template>
  <div class="task-card" :data-task-id="task.id">
    <form @submit.prevent="submit" v-if="editMode">
      <input type="text" :value="task.name" @input="inputValue" @keyup.esc="escape" autofocus />
    </form>
    <div class="task-left" v-if="!editMode" @click.prevent.stop="clickName">{{task.name}}</div>
    <div class="task-right" v-if="!editMode">{{duration}}</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import t from 'src/vuex/mutation-types'
  import utils from '../utils'

  export default {
    data () {
      return {
        editMode: false
      }
    },
    props: ['task'],
    computed: {
      duration () {
        return utils.formatHour(this.task.duration)
      }
    },
    mounted () {
      Vue.eventBus.$on('globalEscape', () => {
        this.editMode = false
      })

      Vue.nextTick(() => {
        if (this.task.newTask) {
          this.editMode = true
          this.$store.commit(t.UPDATE_TASK, {taskId: this.task.id, valueObject: {newTask: false}})
          // console.log(this.$refs.task_name)
          // this.$refs.task_name.focus()
        }
      })
    },
    methods: {
      clickName () {
        this.editMode = true
      },

      escape () {
        this.editMode = false
      },

      inputValue (e) {
        this.$store.commit(t.UPDATE_TASK, {taskId: this.task.id, valueObject: {name: e.target.value}})
      },

      submit (e) {
        this.editMode = false
      }
    }
  }
</script>
