<script setup lang="ts">
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AgGridVue } from "ag-grid-vue3"
import {useProjectModel} from "@/entities/Projects"

const projectModel = useProjectModel()

const cols = [
  { headerName: "Фамилия", field: "lastName", sortable: true},
  { headerName: "Имя", field: "firstName", sortable: true},
  { headerName: "Дней отпуска", field: "days", sortable: true},
]

</script>

<template>
  <div class="tableWrapper">
    <div v-if="projectModel.selectedProjectItem">
      Проект: {{ projectModel.selectedProjectItem.title }};
      Сотрудников в проекте: {{ projectModel.selectedProjectItem.employeesIds.length }};
    </div>
    <RouterLink
        v-if="projectModel.selectedProjectItem"
        :to="`/edit/${projectModel.selectedProjectItem?.id}`"
    >
      Редактировать таблицу
    </RouterLink>
    <div v-if="!projectModel.selectedProjectItem">
      Проект не выбран
    </div>
    <AgGridVue
        v-else
        :rowData="projectModel.getEmployeesByProjectId(projectModel.selectedProjectItem.id)"
        :columnDefs="cols"
        style="width: 100%; height: 500px;"
        class="ag-theme-quartz"
    />
  </div>
</template>

<style scoped>
.tableWrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 800px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  width: 33.333%;
  border: 1px solid #878787;
  padding: 8px;
}
</style>
