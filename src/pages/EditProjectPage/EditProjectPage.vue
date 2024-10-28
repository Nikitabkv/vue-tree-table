<script setup lang="ts">
import ProjectEditForm from "@/widgets/ProjectEditForm"
import {useProjectModel} from "@/entities/Projects"
const projectModel = useProjectModel()
</script>

<template>
  <div>
    <RouterLink to="/" @click="projectModel.setSelectedProjectItem(null)">
      На главную
    </RouterLink>
  </div>
  <ProjectEditForm />
</template>
