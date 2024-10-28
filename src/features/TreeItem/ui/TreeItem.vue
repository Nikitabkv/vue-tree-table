<script setup lang="ts">
import {ref} from "vue"
import {getChildrenCount, useProjectModel} from "@/entities/Projects"

interface ITreeItem {
  id: string
  title: string
  "employeesIds": string[]
  children?: ITreeItem[]
  paddingLeft?: number
}

const {setSelectedProjectItem} = useProjectModel()

const item = defineProps<ITreeItem>()
const isOpen = ref(false)

const itemClickHandler = () => {
  isOpen.value = !isOpen.value
  setSelectedProjectItem(item)
}

</script>

<template>
  <div
      class="tree-item"
      @click="itemClickHandler"
      :style="{paddingLeft: item.paddingLeft + 'px'}"
  >
    <span>
      - {{ item.title }}
    </span>
    <span v-if="item.children && item.children.length > 0">
      ({{ getChildrenCount(item) }})
    </span>
  </div>
  <TreeItem
    v-if="item.children && isOpen"
    v-for="child in item.children"
    v-bind="child"
    :padding-left="item.paddingLeft ? item.paddingLeft + 20 : 20"
  />
</template>

<style scoped>
.tree-item {
  cursor: pointer;
}
</style>
