<script setup lang="ts">
import {useProjectModel} from "@/entities/Projects"
import TreeItem from "@/features/TreeItem"
const projectModel = useProjectModel()
</script>

<template>
  <span>
    Выбранный id: {{ projectModel.selectedProjectItem?.id }}
  </span>
  <div>
      <TreeItem
          v-for="item in projectModel.treeModel"
          v-bind="item"
      />
  </div>
</template>

<style scoped>
</style>
