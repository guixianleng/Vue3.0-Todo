 <template>
   <div class="task-types">
      <a-radio-group button-style="solid" :default-value="curBar" v-model="curBar" :options="options" @change="onChange" />
   </div>
 </template>

 <script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs } from 'vue'
import { TASK_TYPES } from '@/types/todo'

 export default defineComponent({
    name: 'task-bar',
    props: {
      curBar: {
        type: Number as PropType<TASK_TYPES>
      }
    },
    emits: ['toggle'],
    setup (props, context) {
      const state = reactive({
        options: [
          { label: '所有任务', value: TASK_TYPES.all },
          { label: '未完成的任务', value: TASK_TYPES.undone },
          { label: '完成的任务', value: TASK_TYPES.done },
        ]
      })

      // 类型处理
      function onChange (e: Event) {
        context.emit('toggle', e.target.value)
      }

      return {
        ...toRefs(state),
        onChange
      }
    }
 })
 </script>

 <style lang="scss" scoped>
  .task-types {
    text-align: right;
    margin: 20px 0;
  }
 </style>