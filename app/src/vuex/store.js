import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import t from 'src/vuex/mutation-types'
Vue.use(Vuex)
import {v4 as uuidV4} from 'uuid'

const saveToLocalStorage = (state) => {
  localStorage.setItem('tasks', JSON.stringify(state.tasks))
}

const state = {
  tasks: [
    {
      id: uuidV4(),
      status: 'done',
      name: 'task a',
      duration: 60 * 60 * 3,
      position: 1,
      history: [
        {
          start: moment('2016-12-01 06:00:00').unix(),
          end: moment('2016-12-01 09:00:00').unix()
        },
        {
          start: moment('2016-12-01 08:00:00').unix(),
          end: moment('2016-12-01 10:00:00').unix()
        }
      ]
    },
    {
      id: uuidV4(),
      status: 'done',
      name: 'task b',
      duration: 60 * 60 * 2.5,
      position: 2,
      history: [
        {
          start: moment('2016-12-01 10:30:00').unix(),
          end: moment('2016-12-01 13:00:00').unix()
        }
      ]
    },
    {
      id: uuidV4(),
      status: 'done',
      name: 'task c',
      duration: 60 * 60 * 1,
      position: 3,
      history: [
        {
          start: moment('2016-12-01 13:00:00').unix(),
          end: moment('2016-12-01 14:00:00').unix()
        }
      ]
    },
    {
      id: uuidV4(),
      status: 'doing',
      name: 'now task',
      start: moment('2016-12-01 13:00:00').unix(),
      duration: 0,
      position: 1,
      history: []
    },
    {
      id: uuidV4(),
      status: 'todo',
      name: 'task d',
      duration: 0,
      position: 1,
      history: []
    },
    {
      id: uuidV4(),
      status: 'todo',
      name: 'task e',
      duration: 0,
      position: 2,
      history: []
    }
  ]
}

const getters = {
  todoTasks (state) {
    return state.tasks.filter((task) => {
      return task.status === 'todo'
    }).sort((a, b) => {
      return a.position - b.position
    })
  },

  doingTasks (state) {
    return state.tasks.filter((task) => {
      return task.status === 'doing'
    }).sort((a, b) => {
      return a.position - b.position
    })
  },

  doneTasks (state) {
    return state.tasks.filter((task) => {
      return task.status === 'done'
    }).sort((a, b) => {
      return a.position - b.position
    })
  }
}

const findTaskIndex = (state, id) => {
  return state.tasks.findIndex(task => task.id === id)
}

const calcPosition = (state, nextStatus, index) => {
  let tasks

  if (nextStatus === 'todo') {
    tasks = getters.todoTasks(state)
  } else if (nextStatus === 'doing') {
    tasks = getters.doingTasks(state)
  } else if (nextStatus === 'done') {
    tasks = getters.doneTasks(state)
  }

  if (tasks.length === 0) {
    return 0
  } else if (index === 0) {
    return tasks[index].position - 1
  } else if (index === tasks.length) {
    return tasks[index - 1].position + 1
  } else {
    return (tasks[index - 1].position + tasks[index].position) / 2
  }
}

const mutations = {
  [t.LOAD_FROM_LOCAL_STORAGE] (state) {
    state.tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  },

  [t.UPDATE_TASK_STATUS] (state, {taskId, nextStatus, index}) {
    const taskIndex = findTaskIndex(state, taskId)
    console.log(index, calcPosition(state, nextStatus, index))
    state.tasks[taskIndex].position = calcPosition(state, nextStatus, index)

    if (nextStatus === 'todo') {
      state.tasks[taskIndex].status = 'todo'
      if (state.tasks[taskIndex].start) {
        state.tasks[taskIndex].duration += (moment().unix() - state.tasks[taskIndex].start)
      }
      state.tasks[taskIndex].history.push({
        start: state.tasks[taskIndex].start,
        end: moment().unix()
      })
      state.tasks[taskIndex].start = null
    } else if (nextStatus === 'doing') {
      state.tasks[taskIndex].status = 'doing'
      state.tasks[taskIndex].start = moment().unix()
    } else if (nextStatus === 'done') {
      state.tasks[taskIndex].status = 'done'
      if (state.tasks[taskIndex].start) {
        state.tasks[taskIndex].duration += (moment().unix() - state.tasks[taskIndex].start)
      }
      state.tasks[taskIndex].history.push({
        start: state.tasks[taskIndex].start,
        end: moment().unix()
      })
      state.tasks[taskIndex].start = null
    }

    saveToLocalStorage(state)
  },

  [t.UPDATE_TASK] (state, {taskId, valueObject}) {
    const taskIndex = findTaskIndex(state, taskId)

    Object.keys(valueObject).forEach(function (key) {
      state.tasks[taskIndex][key] = valueObject[key]
    })

    saveToLocalStorage(state)
  },

  [t.NEW_TASK] (state) {
    const todoTasks = getters.todoTasks(state)

    state.tasks.push({
      id: uuidV4(),
      status: 'todo',
      name: '',
      duration: 0,
      position: todoTasks[todoTasks.length - 1] ? todoTasks[todoTasks.length - 1].position : 1,
      history: [],
      newTask: true
    })

    saveToLocalStorage(state)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict: true
})
