<script setup lang="ts">

import {ref} from "vue"
import axios from "axios"
import {useToast} from "../ui/toast"

interface TreeNode {
  id: string;
  title: string;
  children?: TreeNode[];
}
interface FlattenedNode {
  id: string;
  title: string;
}

const { toast } = useToast()

const props = defineProps({
  treeData: {
    type: Array as () => TreeNode[],
    default: () => [],
  }
})
const emit = defineEmits(['close', 'updateTreeData'])

const selectedParentId = ref<string | null>(null)

const flattenTree = (data: TreeNode[]): FlattenedNode[] => {
  const result: FlattenedNode[] = []

  const flatten = (item: TreeNode) => {
    result.push({ id: item.id, title: item.title })

    if (item.children) {
      item.children.forEach((child) => flatten(child))
    }
  };

  data.forEach((item) => flatten(item))
  return result
}

const title = ref('')

const onSave = () => {
  axios.post('http://localhost:3000/groups', {
    id: Math.random() * 1000,
    title: title.value
  })
      .then((response) => {
        emit('updateTreeData', [...props.treeData, response.data]);
        emit('close')
        toast({
          duration: 5000,
          title: `Успех`,
          description: 'Группа успешно создана',
        })
      })
      .catch((error) => {
        toast({
          duration: 5000,
          variant: "destructive",
          title: `Ошибка: ${error.status}`,
          description: error.message,
        })
      })
}
</script>

<template>
  <div class="wrapper">
    <div class="form">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
      <label for="parent">Родительский элемент</label>
      <select id="parent">
        <option @change="selectedParentId = null">Не выбрано</option>
        <template v-for="item in flattenTree(props.treeData)">
          <option @change="selectedParentId = item.id" :value="item.id">{{ item.title }}</option>
        </template>
      </select>
      <button @click="onSave">Сохранить</button>
      <button @click="emit('close')">Закрыть</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  backdrop-filter: drop-shadow(20px 20px 20px rgba(0, 0, 0, 0.25));
  background-color: rgba(36, 36, 36, 0.46);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  padding: 50px;
  border-radius: 24px;
}
</style>


