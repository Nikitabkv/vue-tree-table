<script setup lang="ts">
import axios from "axios"
import {onMounted, ref} from "vue"
import {RouteParamValue, useRoute} from "vue-router"
import {useToast} from "../../components/ui/toast"

interface ITableData {
  id: number
  lastName: string
  firstName: string
  days: string
}

async function getData(groupId: string | RouteParamValue[]) {
  const response = await axios.get('http://localhost:3000/groupsData/' + groupId)
  return response.data
}

const route = useRoute()
const { toast } = useToast()

const errorMessage = ref<string | null>(null)
const tableData = ref<any>(null)
const setTableData = (data: ITableData[]) => {
  tableData.value = data
}

const updateTableData = () => {
  axios.patch('http://localhost:3000/groupsData/' +route.params.id, {
    id: route.params.id,
    rows: tableData.value
  })
      .then(() => {
        toast({
          title: "Успех",
          description: "Данные успешно обновлены",
        })
      })
      .catch((error) => {
        errorMessage.value = error.message
        toast({
          duration: 5000,
          variant: "destructive",
          title: `Ошибка: ${error.status}`,
          description: error.message,
        })
      })
}

const addNewPerson = () => {
  console.log(new Date().getTime())
  const newPerson = {
    id: new Date().getTime(),
    firstName: '',
    lastName: '',
    days: '0',
  }
  setTableData([...tableData.value, newPerson])
}

onMounted(() => {
  getData(route.params.id)
      .then(data => setTableData(data.rows))
      .catch((error) => {
        errorMessage.value = error.message
        toast({
          duration: 5000,
          variant: "destructive",
          title: `Ошибка: ${error.status}`,
          description: error.message,
        })
      })
})

</script>

<template>
  <div>
    <RouterLink to="/">
      На главную
    </RouterLink>
  </div>

  <div v-if="tableData === null && !errorMessage">Загрузка...</div>
  <div v-else-if="errorMessage">
    {{errorMessage}}
  </div>
  <template v-else>
    <div class="flexCol">
      <div v-if="tableData?.length === 0 && !errorMessage">Данных нет, нужно добавить нового сотрудника</div>
      <button @click="addNewPerson">
        Добавить нового сотрудника
      </button>
      <div v-for="row in tableData" class="flexRow">
        <label>
          Фамилия:
          <input type="text" v-model="row.lastName">
        </label>
        <label>
          Имя:
          <input type="text" v-model="row.firstName">
        </label>
        <label>
          Дней отпуска:
          <input type="number" v-model="row.days">
        </label>
        <button @click="setTableData(tableData.filter((item: any) => item.id !== row.id))">
          Удалить
        </button>
      </div>
      <button @click="updateTableData">
        Сохранить
      </button>
    </div>
  </template>

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


