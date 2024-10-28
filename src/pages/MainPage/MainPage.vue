<script setup lang="ts">
import ProjectsTree from "@/widgets/ProjectsTree"
import ProjectTable from "@/features/ProjectTable"
import AddProjectModal from "@/widgets/AddProjectModal"
import {ref} from "vue"

const addModalIsOpen = ref(false)
</script>

<template>
  <div class="wrapper">
    <div class="menu">
      <ProjectsTree />
      <AddProjectModal
          v-if="addModalIsOpen"
          @close="addModalIsOpen = false"
      />
      <button @click="addModalIsOpen = true">Добавить проект</button>
      <RouterLink to="edit-employees">
        Редактировать список сотрудников
      </RouterLink>
    </div>
    <div class="tableWrapper">
      <ProjectTable />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 16px;
  width: 100%;
}
.menu {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
}
.tableWrapper {
  flex-grow: 1;
}
</style>


