<template>
  <div class="home">
    <div class="home-title">Vue todo list</div>
    <div class="home-top">
      <a-input v-model:value="task" placeholder="添加任务（按回车键即可添加）" allowClear @pressEnter="handleAdd" />
      <a-button type="primary" ghost @click="handleAdd">
        添加
      </a-button>
    </div>
    <task-bar :curBar="currType" @toggle="setCurrentType"></task-bar>
    <!-- 任务列表 --> 
    <div class="home-content">
      <task-item :list="taskList" @deleteItem="handleRemove" :checkList="doneTask" @done="checkDone"></task-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'

import TaskBar from './components/TaskBar.vue'
import TaskItem from './components/TaskItem.vue'

import { Store, useStore } from 'vuex'
import { IGlobalState } from '@/store'
import { taskItem, TASK_TYPES } from '@/types/todo'
import * as Types from '@/store/actions-types'

function useType (store: Store<IGlobalState>) {
  const currType = computed(() => store.state.Todo.currentType)
  // 设置当前的任务栏
  function setCurrentType (currType: TASK_TYPES) {
    store.commit(`Todo/${Types.SET_CURRENT_TYPE}`, currType)
  }

  return {
    currType,
    setCurrentType
  }
}

export default defineComponent({
  name: 'Home',
  components: {
    TaskBar,
    TaskItem
  },
  setup () {
    const store = useStore<IGlobalState>()

    const state = reactive({
      task: '',
      taskList: computed(() => store.state.Todo.taskList),
      doneTask: computed(() => store.state.Todo.doneTask)
    })

    const { currType, setCurrentType } = useType(store)

    // 添加任务
    function handleAdd () {
      if (state.task) {
        store.commit(`Todo/${Types.ADD_TASK_ITEM}`, state.task)
      }
    }

    function checkDone (checks: taskItem[]) {
      store.commit(`Todo/${Types.SET_DONE_TASK_LIST}`, checks)
    }

    // 删除任务
    function handleRemove (i: number) {
      store.commit(`Todo/${Types.DELETE_TASK_ITEM}`, i)
    }

    return {
      ...toRefs(state),
      handleAdd,
      handleRemove,
      checkDone,
      currType,
      setCurrentType
    }
  }
})
</script>

<style lang="scss">
.home {
  margin: 0 auto;
  width: 500px;
  &-title {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
  &-top {
    display: flex;
    align-items: center;
    .ant-btn {
      margin-left: 10px;
    }
  }
  &-content {
    border: 1px solid #999;
    border-radius: 4px;
    padding: 10px;
    margin-top: 20px;
  }
}
</style>
