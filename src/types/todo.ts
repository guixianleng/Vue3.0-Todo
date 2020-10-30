// 定义任务子项类型
export interface taskItem {
  label: string,
  value: string,
  disabled: boolean
}

export enum TASK_TYPES {
  all,
  undone,
  done
}

export interface IToDoState {
  currentType: TASK_TYPES,
  taskList: taskItem[],
  allTasks: taskItem[],
  undoneTask: taskItem[],
  doneTask: taskItem[]
}

export const TASK_LIST = [
  {
    label: '吃饭',
    value: 'undone',
    disabled: false
  },
  {
    label: '睡觉',
    value: 'undone',
    disabled: false
  },
  {
    label: '打豆豆',
    value: 'undone',
    disabled: false
  },
  {
    label: '打游戏',
    value: 'undone',
    disabled: false
  }
]