<script setup lang="ts">
import {useProjectModel} from "@/entities/Projects"
import {ref} from "vue"

const projectModel = useProjectModel()

const newEmployeeFromIsOpen = ref(false)
const newEmployee = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  days: 0,
  inProjectsIds: [],
})
const addNewEmployee = () => {
  projectModel.addEmployee(newEmployee.value)
  newEmployeeFromIsOpen.value = false
}

</script>

<template>
  <button @click="newEmployeeFromIsOpen = true" class="bg-blue-500 font-medium">
    Добавить сотрудника
  </button>
  <div v-if="newEmployeeFromIsOpen" class="flex flex-col gap-2">
    <label>
      Фамилия:
      <input type="text" v-model="newEmployee.lastName" minlength="2" :class="{ 'border-red-500': newEmployee.lastName.length < 2 }">
      <span class="text-red-500" v-if="newEmployee.lastName.length < 2">Введите фамилию</span>
    </label>
    <label>
      Имя:
      <input type="text" v-model="newEmployee.firstName" minlength="2" :class="{ 'border-red-500': newEmployee.firstName.length < 2 }">
      <span class="text-red-500" v-if="newEmployee.firstName.length < 2">Введите имя</span>
    </label>
    <label>
      Отчество:
      <input type="text" v-model="newEmployee.middleName">
    </label>
    <label>
      Дней отпуска:
      <input type="number" min="0" v-model="newEmployee.days" minlength="2" :class="{ 'border-red-500': newEmployee.days < 0 }">
      <span class="text-red-500" v-if="newEmployee.days < 0">Не может быть меньше 0</span>
    </label>
    <div class="flex gap-4">
      <button class="bg-green-500 font-medium" @click="addNewEmployee" :disabled="newEmployee.firstName == '' || newEmployee.lastName == '' || newEmployee.days < 0">Сохранить</button>
      <button class="bg-red-500 font-medium" @click="newEmployeeFromIsOpen = false">Отмена</button>
    </div>
  </div>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: column;
}
</style>


