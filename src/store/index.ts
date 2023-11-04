import { defineStore } from 'pinia'
import { ref } from 'vue'
import { FolderItem } from '@/types/folder.item'
import { generateId } from '@/helpers/generate'

export const useMainStore = defineStore('main', () => {
	const tree = ref<FolderItem[]>([
		{
			name: 'Dir 1',
			folder: true,
			inner: [
				{
					name: 'Dir 1-1',
					folder: true,
					inner: [
						{
							name: 'File 1-1-1',
							folder: false
						}
					]
				},
				{
					name: 'File 1-2',
					folder: false
				}
			]
		},
		{
			name: 'Dir 2',
			folder: true,
			inner: [
				{
					name: 'Dir 2-1',
					folder: true
				},
				{
					name: 'File 2-2',
					folder: false
				}
			]
		},
		{
			name: 'File 2',
			folder: false
		}
	])

	const addIdsRecursively = (item: FolderItem): void => {
		item.id = generateId()

		if (item.inner) {
			for (const innerItem of item.inner) {
				addIdsRecursively(innerItem)
			}
		}
	}

	tree.value.forEach((item: FolderItem) => {
		addIdsRecursively(item)
	})

	const deleteItem = (data: FolderItem[], id: string): void => {
		for (let i = 0; i < data.length; i++) {
			const item = data[i]

			if (item.id === id) {
				data.splice(i, 1)
				return
			}

			if (item.inner && item.inner.length) {
				deleteItem(item.inner, id)
			}
		}
	}

	const changeName = (item: FolderItem, value: string): void => {
		item.name = value
	}

	return {
		tree,
		deleteItem,
		changeName
	}
})
