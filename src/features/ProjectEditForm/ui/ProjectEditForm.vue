<script setup lang="ts">
import {ref} from "vue"
import {useRoute} from "vue-router"
import {useProjectModel} from "@/entities/Projects"
import {IEmployee} from "@/entities/Projects/model/types.d.ts"
import {router} from "@/app/providers"

const route = useRoute()
const projectModel = useProjectModel()
const selectedEmployeeId = ref(null)

const saveEmployeeButtonHandler = (employee: IEmployee) => {
  projectModel.updateEmployee(employee)
}
const removeEmployeeButtonHandler = (employeeId: string) => {
  projectModel.updateProjectEmployees({
    projectId: route.params.id,
    employeeId: employeeId,
    type: "remove"
  })
}
const addEmployeeButtonHandler = (employeeId: string) => {
  projectModel.updateProjectEmployees({
    projectId: route.params.id,
    employeeId: employeeId,
    type: "add"
  })
  selectedEmployeeId.value = null
}

const deleteProjectButtonHandler = () => {
  if (!confirm('Удалить проект?')) return
  projectModel.deleteProject(route.params.id)
  router.push('/')
}

</script>

<template>
  <div class="flexCol">
    <div v-for="employee in projectModel.getEmployeesByProjectId(route.params.id)" class="flexRow">
      <label>
        Фамилия:
        <input type="text" v-model="employee.lastName" >
      </label>
      <label>
        Имя:
        <input type="text" v-model="employee.firstName" >
      </label>
      <label>
        Дней отпуска:
        <input type="number" v-model="employee.days">
      </label>
      <button @click="removeEmployeeButtonHandler(employee.id)">
        Удалить
      </button>
      <button @click="saveEmployeeButtonHandler(employee)">
        Сохранить
      </button>
    </div>
    <hr />
    <div>
      Добавить сотрудника
      <select v-model="selectedEmployeeId">
        <option v-for="employee in projectModel.employees.filter((emp: IEmployee) => !projectModel.getEmployeesByProjectId(route.params.id).includes(emp))" :value="employee.id">
          {{ employee.lastName }} {{ employee.firstName }}
        </option>
      </select>
      <button v-if="selectedEmployeeId" @click="addEmployeeButtonHandler(selectedEmployeeId)">
        Добавить
      </button>
    </div>
    <button @click="deleteProjectButtonHandler">
      Удалить проект
    </button>
  </div>
</template>

<style scoped>
.flexCol {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.flexRow {
  display: flex;
  gap: 16px;
}
</style>

