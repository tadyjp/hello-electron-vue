<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:400);

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
  }

  @import url('./styles/dragula.css');

  .task-card {
    height: 50px;
    display: flex;
    background-color: white;
    margin: 2px;
    padding: 0 8px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    cursor: move;
  }

  .task-card:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }

  .task-card-container {
    flex: 1;
    overflow-y: auto;
  }
</style>

<style scoped>
  #app-main {
    width: 100%;
    height: 100%;
    display: flex;
  }
  #app-left {
    background-color: #e0a3e0;
    height: 100%;
    padding: 4px;

    flex: 1;
    display: flex;
    flex-direction: column;
  }
  #app-center {
    background-color: #a3e0e0;
    height: 100%;
    padding: 4px;

    flex: 1;
    display: flex;
    flex-direction: column;
  }
  #app-right {
    background-color: #e0e0a3;
    height: 100%;
    padding: 4px;

    flex: 1;
    display: flex;
    flex-direction: column;
  }
  #new-task {
    float: right;
  }
</style>

<template>
  <div id="app-main">
    <div id="app-left">
      <div>
        ToDo
        <button id="new-task" @click="newTask">New Task</button>
      </div>
      <div class="task-card-container" v-dragula="todoTasks" bag="bag" data-status="todo">
        <todo-task :task="task" v-for="task in todoTasks" :key="task.id"></todo-task>
      </div>
    </div>
    <div id="app-center">
      <div>Doing</div>
      <div class="task-card-container" v-dragula="doingTasks" bag="bag" data-status="doing">
        <doing-task :task="task" v-for="task in doingTasks" :key="task.id"></doing-task>
      </div>
    </div>
    <div id="app-right">
      <div>Done</div>
      <div class="task-card-container" v-dragula="doneTasks" bag="bag" data-status="done">
        <done-task :task="task" v-for="task in doneTasks" :key="task.id"></done-task>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import DoingTask from './components/DoingTask'
  import TodoTask from './components/TodoTask'
  import DoneTask from './components/DoneTask'
  import store from 'src/vuex/store'
  import { mapGetters } from 'vuex'
  import t from 'src/vuex/mutation-types'

  export default {
    components: {
      DoingTask,
      TodoTask,
      DoneTask
    },
    store,
    created () {
      Vue.eventBus = new Vue()
      // window.addEventListener('keyup', (e) => {
      //   if (e.keyCode === 27) {
      //     Vue.eventBus.$emit('globalEscape')
      //   }
      // }, false)
    },
    mounted () {
      this.$store.commit(t.LOAD_FROM_LOCAL_STORAGE)

      Vue.vueDragula.eventBus.$on('drop', ([bag, dropElm, target, source]) => {
        console.log(target.children)
        const index = Array.prototype.indexOf.call(target.children, dropElm)
        const taskId = dropElm.dataset.taskId
        const nextStatus = target.dataset.status

        this.$store.commit(t.UPDATE_TASK_STATUS, {taskId, nextStatus, index})
      })
    },
    computed: {
      ...mapGetters([
        'todoTasks', 'doingTasks', 'doneTasks'
      ])
    },
    methods: {
      newTask (e) {
        this.$store.commit(t.NEW_TASK)
      }

      // click (e) {
      //   Vue.eventBus.$emit('globalEscape')
      // }
    }
  }
</script>

