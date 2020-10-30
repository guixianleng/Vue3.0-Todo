/**
 * 对象数组去重
 * @param arr 去重数组
 * @param key 唯一的key值
 */
export function uniqueArr(arr: Array<any>, key: string) {
  const hash: any = {}
  return arr.reduce((newArr: Array<any>, item: any) => {
    hash[item[key]] ? '' : (hash[item[key]] = true && newArr.push(item))
    return newArr
  }, [])
}