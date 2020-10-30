import { Module } from 'vuex'

import { IToDoState, TASK_TYPES, TASK_LIST } from '../../types/todo'
import { IGlobalState } from '..'
import * as Types from '../actions-types'
import { message } from 'ant-design-vue'

const state = {
  currentType: TASK_TYPES.all,
  taskList: TASK_LIST,
  allTasks: TASK_LIST, // 所有任务列表
  undoneTask: [], // 未完成的任务列表
  doneTask: [], // 完成的任务列表
}

const Todo:Module<IToDoState, IGlobalState> = {
  namespaced: true, // 解决不同模块的命名冲突问题
  state,
  mutations: {
    // 增加任务
    async [Types.ADD_TASK_ITEM] (state, payLoad: string) {
      const isExit = await state.allTasks.some(ele => {
        return ele.label == payLoad
      })
      if (isExit) {
        message.error('请勿重复添加任务哦！')
        return false
      }
      state.allTasks = [
        ...state.allTasks,
        {
          label: payLoad,
          value: 'all',
          disabled: false
        }
      ]
      state.taskList = state.allTasks
      state.undoneTask = state.allTasks
    },
    // 删除子任务
    [Types.DELETE_TASK_ITEM](state, index: number) {
      console.log(index)
      state.allTasks.splice(index, 1)
    },
    // 设置当前的任务栏
    [Types.SET_CURRENT_TYPE](state, payload: TASK_TYPES) {
      state.currentType = payload
      switch (payload) {
        case 1:
          state.taskList = state.undoneTask
          break
        case 2:
          state.taskList = state.doneTask
          break
        default:
          state.taskList = state.allTasks
      }
    },
    async [Types.SET_DONE_TASK_LIST](state, payload: any) {
      payload.value = 'done'
      payload.disabled = true
      state.doneTask = [...state.doneTask, payload]
      // 处理未完成的任务
      state.undoneTask = state.allTasks.filter(item => !state.doneTask.some(e => e === item))
      console.log(state.undoneTask, '未完成的任务')
    }
  }
}

export default Todo