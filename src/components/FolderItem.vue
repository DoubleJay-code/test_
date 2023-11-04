<script setup lang="ts">
import { FolderItem as FolderItemType } from '@/types/folder.item'
import { useMainStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
	item?: FolderItemType | null
}>(), {
	item: null
})

const itemName = ref(props.item.name)
const isEditing = ref(false)

const mainStore = useMainStore()
const { tree } = storeToRefs(mainStore)

const updateName = (value: string): void => {
	itemName.value = value
}

const saveName = (): void => {
	mainStore.changeName(props.item, itemName.value)
	isEditing.value = false
}
</script>

<template>
	<div class="folder-item">
		<div class="folder-item__content">
			<div class="folder-item__block">
				<span>{{ props.item.folder ? '&#128193;' : '&#128196;' }}</span>
				<span v-if="!isEditing" @click="isEditing = true">
					{{ props.item.name }}
				</span>
				<input
					v-else
					autofocus
					type="text"
					class="folder-item__block-input"
					:value="itemName"
					@input="updateName($event.target.value)"
					@blur="saveName"
				>
			</div>
			<div class="folder-item__block">
				<span
					class="folder-item__block-action"
					@click="isEditing = !isEditing"
				>
					&#128393;
				</span>
				<span
					class="folder-item__block-action"
					@click="mainStore.deleteItem(tree, props.item.id)"
				>
					&#128465;
				</span>
			</div>
		</div>
		<folder-item
			v-for="(item, index) in props.item.inner"
			:key="`folder-item_${item.id}_${index}`"
			:item="item"
		/>
	</div>
</template>

<style lang="scss" scoped>
.folder-item {
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding-left: 30px;
	font-size: 22px;

	&__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__block {
		display: flex;
		align-items: center;
		gap: 5px;

		&-input {
			font-size: 18px;
		}

		&-action {
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			min-width: 25px;
		}
	}
}
</style>
