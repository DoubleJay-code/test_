export interface FolderItem {
	name: string
	folder: boolean
	id?: string
	inner?: FolderItem[]
}
