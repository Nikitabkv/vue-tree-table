<script setup lang="ts">
import {onMounted, ref} from 'vue'
import TreeItem from "../../components/TreeItem/TreeItem.vue"
import Table from "../../components/Table/Table.vue"
import axios from "axios"

interface ITreeData {
  id: string
  title: string
  children?: ITreeData[]
}

async function getData() {
  const response = await axios.get('http://localhost:3000/groups')
  return response.data
}

const selectedGroupId = ref<any>(null)
const updateSelectedGroupId = (id: string) => {
  selectedGroupId.value = id
}

const treeData = ref<ITreeData[] | null>(null)
const setTreeData = (data: any) => {
  treeData.value = data
}

onMounted(() => {
  getData()
      .then(data => setTreeData(data))
      .catch(
          (error) => alert(error.message)
      )
})
</script>

<template>
  <div class="wrapper">
    <div class="menu">
      <TreeItem
          v-if="treeData"
          v-for="item in treeData"
          v-bind="item"
          :paddingLeft="0"
          :selectedGroupId="selectedGroupId"
          :updateSelectedGroupId="updateSelectedGroupId"
          @update-selected-group-id="updateSelectedGroupId"
      />
      <span v-else>Загрузка...</span>
    </div>
    <div class="tableWrapper">
      <span v-if="selectedGroupId === null">Группа или проект не выбраны</span>
      <Table v-else :groupId="selectedGroupId"/>
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
  width: 300px;
}
.tableWrapper {
  flex-grow: 1;
}
</style>


