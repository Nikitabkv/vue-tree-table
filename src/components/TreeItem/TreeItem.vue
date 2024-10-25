<script setup lang="ts">
import {ref} from 'vue'

const item = defineProps<{
  id: string,
  title: string,
  children?: any[],
  paddingLeft: number,
  selectedGroupId: string | null,
  updateSelectedGroupId: (id: string) => void
}>()
const emit = defineEmits(['update-selected-group-id'])

const calcChildCount = () => {
  let result = 0;

  const flatten = (item: any) => {
    result++;

    if (item.children) {
      item.children.forEach((child: any) => flatten(child));
    }
  };

  if (item.children) {
    item.children.forEach((item: any) => flatten(item));
  }

  return result;
};

const childCount = calcChildCount();

const opened = ref(false)

const toggle = () => {
  if (item.selectedGroupId !== item.id) {
    opened.value = true
    emit('update-selected-group-id', item.id)
  } else {
    opened.value = false
    emit('update-selected-group-id', null)
  }
}
</script>

<template>
  <div>
    <div @click="toggle" :style="{paddingLeft: item.paddingLeft + 'px', cursor: 'pointer'}">
      <span v-if="item.children">{{ item.children && opened ? '⤴' : '↴' }}</span>
      <span v-else> - </span>
      {{ item.title }} {{ item.children ? `(${childCount})` : '' }}
      <span class="circle" v-if="item.id === item.selectedGroupId">○</span>
    </div>
    <div v-if="opened">
      <TreeItem
        v-if="item.children"
        v-for="child in item.children"
        v-bind="child"
        :paddingLeft="item.paddingLeft + 20"
        :selectedGroupId="item.selectedGroupId"
        :updateSelectedGroupId="updateSelectedGroupId"
        @update-selected-group-id="updateSelectedGroupId"
      />
    </div>
  </div>
</template>

<style scoped>
.circle {
  color: #6c56ff;
}
span {
  display: inline-block;
  width: 15px;
}
</style>
