<script setup lang="ts">
import {useProjectModel} from "@/entities/Projects"
import EditEmployeesListItem from "@/features/EditEmployeesListItem"
import NewEmployeeForm from "@/features/NewEmployeeForm"

const projectModel = useProjectModel()

</script>

<template>
  <RouterLink to="/">Назад</RouterLink>
  <div class="wrapper">
    <div class="employees-list">
      <h2>Список всех сотрудников</h2>
      <EditEmployeesListItem
          v-for="employee in projectModel.employees"
          :employee="employee"
      />
      <NewEmployeeForm />
    </div>
  </div>
</template>

<style scoped>
.employees-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>


