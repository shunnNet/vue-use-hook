# @crazydos/vue-use-hook
use event to manage your modules & components state

## Why
There are situations that I need reset or change a lots of state of modules and components, or make some action, for user's input. How do you manage these changes ? I see someone put all these changes in one modules function, I can't understand each module or component in what state in "the time". I want to know each modules / components change in any time, or like I said , event.
This module try to help someone who want know all changes in any time of a module or component.

Maybe, it's just a EventBus.

## Install

`npm install @crazydos/vue-use-hook`

## Usage

First, you must declare hook you want to use in your application.

```javascript
// main.js
import {hook} from "@crazydos/vue-use-hook"

hook.declareHook([
  "userChooseItem",
  "userUnChooseItem"
])

hook.log = process.env.NODE_ENV !== "production"
// optionally open logger for debugging

```

And you can use hook in your application

```vue
<script>
// itemCounter.vue
import { useHook } from "@crazydos/vue-use-hook"
export default {
  name: "itemCounter",
  setup(){
    const itemCount = ref(0)
    useHook({
      // event regist here, and auto unregist when onBeforeUnmount
      userChooseItem(val){
        itemCount.value += val // 1
      },
      userUnChooseItem(val){
        itemCount.value -= 1
      }
    })
  }
}
</script>

<!-- itemPicker.vue -->
<script>
import { useTrigger } from "@crazydos/vue-use-hook"
export default {
  name: "itemPicker",
  setup(){
    const { userChooseItem, userUnChooseItem } = useTrigger({
      userChooseItem(val){
        return val
      },
      userUnChooseItem: true,
    })

    return {
      userChooseItem, 
      userUnChooseItem
    }
  }
}
</script>
<template>
  <button @click="userChooseItem(1)">pick</button>
  <button @click="userUnChooseItem">drop</button>
</template>
```

even more, (like event bus) you can listen event outside component, like some little store

```javascript
import { registHook } from "@crazydos/vue-use-hook"
import { ref } from "vue"

const itemCount = ref(0)

registHook({
  userChooseItem(val){
    itemCount.value += val
  },
  userDropAllItem(){
    itemCount.value = 0
  }
}, "itemCounter")

// second parameter name : "itemCounter" is required for unregisteration 

```

Manage state with timeline.

## Documentation
...coming soon