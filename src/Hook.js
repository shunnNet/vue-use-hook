const IS_NOT_PRODUCTION = process.env.NODE_ENV !== "production"
class Hook {
  constructor() {
    this.e = {}
    this.log = false
  }
  on(hook, option) {
    if (this.e[hook]) {
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
  }
  emit(hook, ...value) {
    if (this.e[hook]) {
      this.e[hook].forEach((listener) => {
        if (this.log) {
          console.log(
            `%c hook:${hook} / name:${listener.name} / ${value} `,
            "background: orange; color: black"
          )
        }
        listener.fn(...value)
      })
    }
  }
  off(hook, name) {
    if (this.e[hook]) {
      const targetIndex = this.e[hook].findIndex(
        (listener) => listener.name === name
      )
      if (targetIndex > -1) {
        this.e[hook].splice(targetIndex, 1)
      }
    }
  }
  declareHook(hooks) {
    hooks.forEach((h) => {
      this.e[h] = []
    })
  }
}

export default Hook
