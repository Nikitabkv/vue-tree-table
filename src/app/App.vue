<script setup lang="ts">
import './index.css'
import {onMounted} from "vue";
import {useProjectModel} from "@/entities/Projects";
import {Toaster} from "@/shared/ui/toast"

const projectModel = useProjectModel()

onMounted(() => {
  projectModel.fetchProjects()
  projectModel.fetchEmployees()
})

</script>

<template>
  <Toaster />
  <RouterView />
</template>

<style scoped>
</style>
