import Hook from "./hook"
import { getCurrentInstance, onBeforeUnmount } from "vue"

export const hook = new Hook()

export function registHook(options, name, order = 1) {
  Object.entries(options).forEach(([event, handler]) => {
    if (typeof handler === "function") {
      hook.on(event, {
        order,
        name,
        callback: handler,
      })
    }
    if (typeof handler === "object") {
      hook.on(event, {
        order: options.order || order,
        name: name,
        callback: options.handler,
      })
    }
  })
}
export function unRegistHook(hookName, name) {
  hook.off(hookName, name)
}

export function useHook(options, order = 1, vm = getCurrentInstance()) {
  const name = vm.ctx.$options.name ? vm.ctx.$options.name : vm.uid
  registHook(options, name, order)
  onBeforeUnmount(() => {
    Object.entries(options).forEach(([event, handler]) => {
      unRegistHook(event, name)
    })
  })
}
export function useTrigger(options) {
  const result = {}
  Object.entries(options).forEach(([event, value]) => {
    result[event] = (val) => {
      hook.emit(event, typeof value === "function" ? value(val) : value)
    }
  })
  return result
}
