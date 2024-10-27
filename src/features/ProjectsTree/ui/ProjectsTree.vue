<script setup lang="ts">
import {useProjectModel} from "@/entities/Projects"
import TreeItem from "@/features/ProjectsTree/TreeItem/ui/TreeItem.vue"
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
          :padding-left="0"
      />
  </div>
</template>

<style scoped>
</style>
