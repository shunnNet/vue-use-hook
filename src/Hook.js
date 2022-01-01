const IS_NOT_PRODUCTION = process.env.NODE_ENV !== 'production'
class Hook {
  constructor() {
    this.e = {}
  }
  on(hook, option) {
    this.e[hook] || (this.e[hook] = [])

    // same name can only regist same hook once
    const alreadyExist = this.e[hook].find(
      (registered) => registered.name === option.name
    )

    if (alreadyExist && IS_NOT_PRODUCTION) {
      console.warn(
        `Same name can only regist same hook once. hook: ${hook},name: ${option.name}`
      )
      return
    }

    this.e[hook].push({
      order: option.order,
      name: option.name,
      fn: option.callback,
    })
    this.e[hook] = this.e[hook].sort((a, b) => a.order - b.order)
  }
  emit(hook, ...value) {
    this.e[hook].forEach((listener) => {
      listener.fn(...value)
    })
  }
  off(hook, name) {
    const targetIndex = this.e[hook].findIndex(
      (listener) => listener.name === name
    )
    if (targetIndex > -1) {
      this.e[hook].splice(targetIndex, 1)
    }
  }
}

export default Hook
