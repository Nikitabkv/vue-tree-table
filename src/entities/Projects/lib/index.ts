import {ITreeItem} from "@/entities/Projects/model/types"
import {IProject} from "../model/types"

export const getChildrenCount = (item: ITreeItem): number => {
  if (item.children && item.children.length > 0) {
    return item.children.reduce((acc: number, child: ITreeItem) => acc + getChildrenCount(child), item.children.length)
  }
  return 0
}

export const buildTreeModel = (items: IProject[]): ITreeItem[] => {
  const projectMap: Record<string, ITreeItem> = items.reduce((acc: Record<string, ITreeItem>, project: IProject) => {
    acc[project.id] = { ...project, children: [] }
    return acc
  }, {})

  const root: ITreeItem[] = []

  items.forEach(project => {
    if (project.parentId) {
      projectMap[project.parentId].children?.push(projectMap[project.id])
    } else {
      root.push(projectMap[project.id])
    }
  })
  return root
}
