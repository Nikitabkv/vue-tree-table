<script setup lang="ts">
import {useProjectModel} from "@/entities/Projects"

const {updateEmployee, deleteEmployee} = useProjectModel()
const {employee} = defineProps(["employee"])

</script>

<template>
  <form class="flex gap-2">
    <label>
      Фамилия:
      <input type="text" v-model="employee.lastName" minlength="2" :class="{ 'border-red-500': employee.lastName.length < 2 }">
      <span class="text-red-500" v-if="employee.lastName.length < 2">Введите фамилию</span>
    </label>
    <label>
      Имя:
      <input type="text" v-model="employee.firstName" minlength="2" :class="{ 'border-red-500': employee.firstName.length < 2 }">
      <span class="text-red-500" v-if="employee.firstName.length < 2">Введите имя</span>
    </label>
    <label>
      Отчество:
      <input type="text" v-model="employee.middleName">
    </label>
    <label>
      Дней отпуска:
      <input type="number" min="0" v-model="employee.days" minlength="2" :class="{ 'border-red-500': employee.days < 0 }">
      <span class="text-red-500" v-if="employee.days < 0">Не может быть меньше 0</span>
    </label>
    <button
        type="submit"
        class="bg-green-500 font-medium"
        @click="updateEmployee(employee)"
        :disabled="employee.firstName == '' || employee.lastName == '' || employee.days < 0"
    >
      Сохранить
    </button>
    <button class="bg-red-500 font-medium" @click="deleteEmployee(employee)">Удалить</button>
  </form>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: column;
}
</style>
