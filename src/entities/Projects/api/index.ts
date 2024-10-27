import { http } from '@/shared/api'
import {IEmployee, IEmployeeWithoutId, IProject, IProjectWithoutId} from "../model/types"

export const fetchProjects = async () => {
  return (await http.get(`/projects`)).data
}

export const fetchEmployees = async () => {
  return (await http.get(`/employees`)).data
}

export const updateProject = async (payload: IProject) => {
  return (await http.patch(`/projects/${payload.id}`, payload)).data
}

export const updateEmployee = async (payload: IEmployee) => {
  return (await http.patch(`/employees/${payload.id}`, payload)).data
}

export const addEmployee = async (payload: IEmployeeWithoutId) => {
  return (await http.post(`/employees`, payload)).data
}

export const deleteEmployee = async (payload: IEmployee) => {
  return (await http.delete(`/employees/${payload.id}`)).data
}

export const addProject = async (payload: IProjectWithoutId) => {
  return (await http.post(`/projects`, payload)).data
}

export const deleteProject = async (id: string) => {
  return (await http.delete(`/projects/${id}`)).data
}
