<script setup lang="ts">
import {onMounted, Ref, ref, toRef, watch} from 'vue'
import axios from "axios"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AgGridVue } from "ag-grid-vue3"
import {useToast} from "../../../@/components/ui/toast"

const cols = ref([
  { headerName: "Фамилия", field: "lastName", sortable: true},
  { headerName: "Имя", field: "firstName", sortable: true},
  { headerName: "Дней отпуска", field: "days", sortable: true},
])

interface ITableData {
  id: number
  lastName: string
  firstName: string
  days: string
}

const props = defineProps({
  groupId: String
})

async function getData(groupId: Ref<String | undefined> | string | undefined) {
  const response = await axios.get('http://localhost:3000/groupsData/' + groupId)
  return response.data
}

const tableData = ref<ITableData[] | null>(null)
const setTableData = (data: ITableData[] | null) => {
  tableData.value = data
}

const { toast } = useToast()

onMounted(() => {
  const groupIdRef = toRef(props, 'groupId')
  watch(groupIdRef, (newGroupId) => {
    setTableData(null)
    getData(newGroupId)
        .then(data => setTableData(data.rows))
        .catch((error) => {
          toast({
            duration: 5000,
            variant: "destructive",
            title: `Ошибка: ${error.status}`,
            description: error.message,
          });
        })
  }, {immediate: true})
})
</script>

<template>
  <div v-if="!tableData">Загрузка...</div>
  <div v-else class="tableWrapper">
    <div>
      Id группы: {{ props.groupId }},
      сотрудников в таблице: {{ tableData.length }},
      отпусков у сотрудников: {{ tableData.reduce((sum, row) => sum + parseInt(row.days), 0) }}
    </div>
    <RouterLink :to="`/edit/${props.groupId}`">
      Редактировать таблицу
    </RouterLink>

    <AgGridVue
        :rowData="tableData"
        :columnDefs="cols"
        style="width: 100%; height: 500px;"
        class="ag-theme-quartz"
    />
<!--    <table class="table">-->
<!--      <tbody>-->
<!--      <tr>-->
<!--        <th>Фамилия</th>-->
<!--        <th>Имя</th>-->
<!--        <th>Дней отпуска</th>-->
<!--      </tr>-->
<!--      <tr v-for="row in tableData">-->
<!--        <td>{{ row.lastName }}</td>-->
<!--        <td>{{ row.firstName }}</td>-->
<!--        <td>{{ row.days }}</td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
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


