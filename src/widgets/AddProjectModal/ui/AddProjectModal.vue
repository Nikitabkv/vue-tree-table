<script setup lang="ts">
import {ref} from "vue"
import {useProjectModel} from "@/entities/Projects"

const projectModel = useProjectModel()
const emit = defineEmits(['close'])
const projectName = ref('')
const selectedParentId = ref(null)

const addButtonHandler = () => {
  projectModel.addProject({
    title: projectName.value,
    parentId: selectedParentId.value,
    employeesIds: []
  })
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="modal">
      <div class="modal-content">
        <form class="modal-body">
          <button @click="emit('close')">Закрыть</button>
          <span v-if="selectedParentId">Id родительского проекта: {{ selectedParentId }}</span>
          <label>
            Название проекта:
            <input type="text" v-model="projectName" minlength="1" :class="{ 'border-red-500': projectName.length < 1 }">
            <span v-if="projectName.length < 1" class="inline-block text-red-500">Введите название проекта</span>
          </label>
          <label>
            Родительский проект:
            <select v-model="selectedParentId">
              <option :value="null">
                Отсутствует
              </option>
              <option v-for="project in projectModel.projects" :value="project.id">
                {{project.title}}
              </option>
            </select>
          </label>
          <button
              type="submit"
              :disabled="projectName.length < 1"
              @click="addButtonHandler"
          >
            Добавить проект
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  width: 300px;
}
.modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>


