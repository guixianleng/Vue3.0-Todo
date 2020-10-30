<template>
  <div class="home">
    <div class="home-title">Vue todo list</div>
    <div class="home-content" v-show="taskList.length">
      
    </div>
    <div class="home-foot">
      <a-input v-model:value="task" placeholder="添加任务" allowClear />
      <a-button type="primary" ghost @click="handleAdd">
        添加
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
import { Store, useStore } from 'vuex'
import { IGlobalState } from '@/store'
import { taskItem } from '@/types/todo'
import * as Types from '@/store/actions-types'

export default defineComponent({
  name: 'Home',
  setup () {
    const state = reactive({
      task: '',
      taskList: computed(() => store.state.Todo.taskList)
    })

    const store = useStore<IGlobalState>()

    function handleAdd () {
      if (state.task) {
        store.commit(`Todo/${Types.ADD_TASK_ITEM}`, state.task)
      }
    }

    return {
      ...toRefs(state),
      handleAdd
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
  }
  &-content {
    border: 1px solid #666;
    border-radius: 4px;
  }
  &-foot {
    margin-top: 20px;
    display: flex;
    align-items: center;
    .ant-btn {
      margin-left: 10px;
    }
  }
}
</style>
