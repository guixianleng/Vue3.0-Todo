# Todo-list

![demo](https://shitu-query-gz.gz.bcebos.com/2020-10-30/16/e3074cb2d678c02b?authorization=bce-auth-v1%2F7e22d8caf5af46cc9310f1e3021709f3%2F2020-10-30T08%3A54%3A49Z%2F300%2Fhost%2F08b56b589c36da05bd9f05bce1a839c357aff00b14e8d7f01dd2fe08ab7f1705)

Vue 3.0 终于在上 2020-09-18 发布悄悄发布 beta 版本，3.0 使用 Typescript 进行了大规模的重构，可以像 React 一样编写 Vue，Composition API RFC 版本更改灵活，本文使用 vue3.0 + Typescript 编写 todolist

## vue 3.0 部分新特性

使用部分新特性开发 todo，项目使用比较规范（从类型定义、状态管理使用 actions-type、types 分类进行命名规范，便于中大型的维护）

- setup()
- ref()
- reactive()
- toRefs()
- computed()
- vuex
- Typescript

### Typescript

使用 Typescript 的`interface`、`enum`定义数据类型

`todo.ts`文件中

```ts
export interface taskItem {
  label: string;
  value: string;
  disabled: boolean;
}
export enum TASK_TYPES {
  all,
  undone,
  done,
}
export interface IToDoState {
  currentType: TASK_TYPES;
  taskList: taskItem[];
  allTasks: taskItem[];
  undoneTask: taskItem[];
  doneTask: taskItem[];
}
```

## vuex 的使用
```ts
得引入核心方法`createStore`(可以定义类型)方便编辑器自动填充

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
```

### 使用
```ts
import { useStore } from 'vuex'

...
  setup () {
    const store = useStore<IGlobalState>()

    const state = reactive({
      task: '',
      taskList: computed(() => store.state.Todo.taskList),
      doneTask: computed(() => store.state.Todo.doneTask)
    })

    return {
      ...toRefs(state)
    }
  }
```

## vue3.0 组件模板

```html
<template>
  <div class="mine" ref="elmRefs">
    <span>{{name}}</span>
    <br />
    <span>{{count}}</span>
    <div>
      <button @click="handleClick">测试按钮</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    onMounted,
    PropType,
    reactive,
    ref,
    toRefs,
  } from "vue";

  interface IState {
    count: 0;
    name: string;
    list: Array<object>;
  }

  export default defineComponent({
    name: "demo",
    // 父组件传子组件参数
    props: {
      name: {
        type: String as PropType<null | "">,
        default: "vue3.x",
      },
      list: {
        type: Array as PropType<object[]>,
        default: () => [],
      },
    },
    components: {
      // TODO 组件注册
    },
    emits: ["emits-name"], // 为了提示作用
    setup(props, context) {
      console.log(props.name);
      console.log(props.list);

      const state = reactive<IState>({
        name: "vue 3.0 组件",
        count: 0,
        list: [
          {
            name: "vue",
            id: 1,
          },
          {
            name: "vuex",
            id: 2,
          },
        ],
      });

      const a = computed(() => state.name);

      onMounted(() => {});

      function handleClick() {
        state.count++;
        // 调用父组件的方法
        context.emit("emits-name", state.count);
      }

      return {
        ...toRefs(state),
        handleClick,
      };
    },
  });
</script>
```
