import { createStore } from 'vuex'
import Todo from './modules/todo'
import { IToDoState } from '../types/todo'

export interface IGlobalState {
  Todo: IToDoState
}

const state = createStore<IGlobalState>({
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    Todo
  }
})

export default state