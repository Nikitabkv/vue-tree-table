import { defineStore } from 'pinia'
import {ProjectsApi} from '../index'
import {
  IProjectsModel,
  IProject, IEmployee, ITreeItem, IProjectWithoutId, IEmployeeWithoutId
} from './types'
import {buildTreeModel} from "../lib"
import {useToast} from "@/shared/ui/toast"

const {toast} = useToast()
const toasts = {
  success: () => toast({
    title: 'Успех',
    duration: 5000,
    variant: 'success'
  }),
  error: (error: string) => toast({
    title: 'Произошла ошибка',
    description: error,
    duration: 5000,
    variant: 'destructive'
  })
}

export const useProjectModel = defineStore({
  id: 'projects',

  state: () =>
    <IProjectsModel>{
      projects: [],
      treeModel: [],
      employees: [],
      selectedProjectItem: null,
    },

  getters: {
    getProjectById: (state) => (id: string) => {
      return state.projects.find((project) => project.id === id)
    },
    getEmployeesByIds: (state) => (ids: string[]) => {
      return state.employees.filter((employee) => ids.includes(employee.id))
    },
    getEmployeesByProjectId: (state) => (id: string) => {
      return state.employees.filter((employee) => employee.inProjectsIds.includes(id))
    }
  },

  actions: {
    async fetchProjects(): Promise<void> {
      try {
        const items = await ProjectsApi.fetchProjects()
        if (items) {
          this.getQueryProjects(items)
        }
      } catch (e: any) {
        toasts.error(e.message)
      }
    },

    async fetchEmployees(): Promise<void> {
      try {
        const items = await ProjectsApi.fetchEmployees()
        if (items) {
          this.getQueryEmployees(items)
        }
      } catch (e: any) {
        toasts.error(e.message)
      }
    },

    async updateProjectEmployees(payload: {projectId: string, employeeId: string, type?: 'add' | 'remove'}): Promise<void> {
      try {
        const project = this.getProjectById(payload.projectId)
        const employee = this.getEmployeesByIds([payload.employeeId])[0]
        if (project && employee) {
          let employeesIds
          let inProjectsIds

          switch (payload.type) {
            case 'add':
              employeesIds = [...project.employeesIds, payload.employeeId]
              inProjectsIds = [...employee.inProjectsIds, payload.projectId]
              break
            case 'remove':
              employeesIds = project.employeesIds.filter((id: string) => id !== payload.employeeId)
              inProjectsIds = employee.inProjectsIds.filter((id: string) => id !== payload.projectId)
              break
            default:
              toast({
                title: 'Ошибка типа действия',
                description: 'Неизвестный тип действия',
                duration: 5000,
              })
              return
          }

          const projectItem = await ProjectsApi.updateProject({
            ...project,
            employeesIds: employeesIds
          })
          const employeeItem = await ProjectsApi.updateEmployee({
            ...employee,
            inProjectsIds: inProjectsIds
          })
          if (projectItem && employeeItem) {
            this.updateQueryProject(projectItem)
            this.updateQueryEmployee(employeeItem)
            toasts.success()
          }
        }
      } catch (e: any) {
        toasts.error(e.message)
      }
    },

    async updateProjectTitle(payload: IProject): Promise<void> {
      try {
        const project = await ProjectsApi.updateProject(payload)
        if (project) {
          this.updateQueryProject(project)
          this.treeModel = buildTreeModel(this.projects)
          toasts.success()
        }
      } catch (e: any) {
        toasts.error(e.message)
      }
    },

    async updateEmployee(payload: IEmployee): Promise<void> {
      try {
        const employee = await ProjectsApi.updateEmployee(payload)
        if (employee) {
          this.updateQueryEmployee(employee)
          toasts.success()
        }
      } catch (e: any) {
        toasts.error(e.message)
      }
    },

    async deleteEmployee(payload: IEmployee): Promise<void> {
      try {
        const employee = await ProjectsApi.deleteEmployee(payload)
        for (let i = 0; i < payload.inProjectsIds.length ; i++) {
          const project = this.getProjectById(payload.inProjectsIds[i])
          if (project) {
            const projectItem = await ProjectsApi.updateProject({
              ...project,
              employeesIds: project.employeesIds.filter((id: string) => id !== payload.id)
            })
            if (projectItem) {
              this.updateQueryProject(projectItem)
            }
          }
        }
        if (employee) {
          this.deleteQueryEmployee(payload.id)
          toasts.success()
        }
      } catch (e: any) {
        toasts.error(e.message)
      }
    },

    async addEmployee(payload: IEmployeeWithoutId): Promise<void> {
      try {
        const item = await ProjectsApi.addEmployee(payload)
        if (item) {
          this.addQueryEmployee(item)
          toasts.success()
        }
      } catch (e: any) {
        toasts.error(e.message)
      }
    },

    async addProject(payload: IProjectWithoutId): Promise<void> {
      try {
        const item = await ProjectsApi.addProject(payload)
        if (item) {
          this.addQueryProject(item)
          toasts.success()
        }
      } catch (e: any) {
        toasts.error(e.message)
      }
    },

    async deleteProject(id: string): Promise<void> {
      try {
        const item = await ProjectsApi.deleteProject(id)
        if (item) {
          this.deleteQueryProject(id)
          toasts.success()
        }
      } catch (e: any) {
        toasts.error(e.message)
      }
    },

    getQueryProjects(payload: IProject[]): void {
      this.projects = payload || [];
      this.treeModel = buildTreeModel(payload);
    },

    getQueryEmployees(payload: IEmployee[]): void {
      this.employees = payload || [];
    },

    updateQueryProject(payload: IProject): void {
      this.projects = this.projects.map((project) => {
        if (project.id === payload.id) {
          return payload
        }
        return project
      })
    },

    updateQueryEmployee(payload: IEmployee): void {
      this.employees = this.employees.map((employee) => {
        if (employee.id === payload.id) {
          return payload
        }
        return employee
      })
    },

    addQueryProject(payload: IProject): void {
      this.treeModel = buildTreeModel([...this.projects, payload]);
      this.projects.push(payload)
    },

    addQueryEmployee(payload: IEmployee): void {
      this.employees.push(payload)
    },

    deleteQueryProject(id: string): void {
      this.projects = this.projects.filter((project) => project.id !== id)
      this.treeModel = buildTreeModel(this.projects)
    },

    deleteQueryEmployee(id: string): void {
      this.employees = this.employees.filter((employee) => employee.id !== id)
    },

    setSelectedProjectItem(item: IProject | ITreeItem | null): void {
      this.selectedProjectItem = item
    }
  }
})
