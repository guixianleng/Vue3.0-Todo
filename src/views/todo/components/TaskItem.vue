<template>
  <div class="task-item">
    <div v-if="list.length">
      <a-checkbox-group v-model="checkList" style="width: 90%;" >
        <a-row v-for="(item, index) in list" :key="index">
          <a-col :span="20">
            <a-checkbox :value="item" @change="onChange" :disabled="item.disabled">
              <span :class="{'midline': item.value == 'done'}">{{ item.label }}</span>
            </a-checkbox>
          </a-col>
          <a-col :span="3" :offset="1">
            <a-popconfirm
              title="Are you sure delete this task?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="handleDelete(index)"
            >
              <a href="#">Delete</a>
            </a-popconfirm>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </div>
    <div v-else>
      <a-empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
          height: '60px',
        }"
      >
      </a-empty>
    </div>
  </div>
</template>

<script lang="ts">
import { taskItem } from '@/types/todo'
import { defineComponent, ref, PropType, computed, reactive } from 'vue'

export default defineComponent({
  name: 'task-item',
  props: {
    checkList: {
      type: Array,
      default: () => ([])
    },
    list: {
      type: Array,
      default: () => ([])
    }
  },
  emits: ['deleteItem', 'done'], // 此处为了校验方法
  setup (props, context) {
    const defaultCheckList = computed(() => {
      let checks: string[] = []
      props.checkList.filter((item: any) => {
        checks.push(item.label)
      })
      console.log(checks, 222)
      return checks
    })
    // 删除子项
    function handleDelete (index: number) {
      context.emit('deleteItem', index)
    }

    function onChange (e: any) {
      console.log('checked = ', e.target.value)
      context.emit('done', e.target.value)
    }

    return {
      defaultCheckList,
      handleDelete,
      onChange
    }
  }
})
</script>

<style lang="scss">
.task-item {
  width: 100%;
  margin: 0 auto;
  .ant-col {
    margin-top: 10px;
    text-align: left;
  }
  .midline {
    text-decoration: line-through;
  }
}
</style>