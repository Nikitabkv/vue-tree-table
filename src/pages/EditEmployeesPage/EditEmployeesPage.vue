<script setup lang="ts">
import {useProjectModel} from "@/entities/Projects"
import EditEmployeesListItem from "@/features/EditEmployeesListItem/ui/EditEmployeesListItem.vue"
import NewEmployeeForm from "@/features/NewEmployeeForm/ui/NewEmployeeForm.vue"

const projectModel = useProjectModel()

</script>

<template>
  <RouterLink to="/">Назад</RouterLink>
  <div class="wrapper">
    <div class="employees-list">
      <h2>Список всех сотрудников</h2>
      <div class="list-item" v-for="employee in projectModel.employees">
        <EditEmployeesListItem :employee="employee"/>
      </div>
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
.list-item {
  display: flex;
  gap: 16px;
}
</style>


