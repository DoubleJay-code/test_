<script setup lang="ts">
import { useMainStore } from '@/store'
import { storeToRefs } from 'pinia'
import FolderItem from '@/components/FolderItem.vue'

const mainStore = useMainStore()
const { tree } = storeToRefs(mainStore)
</script>

<template>
  <div class="main-page">
	  <div class="main-page__list">
		  <folder-item
			  v-for="(item, index) in tree"
			  :key="`folder-item_${item.id}_${index}`"
			  :item="item"
		  />
	  </div>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
	padding: 100px 40px;

	&__list {
		display: flex;
		flex-direction: column;
		gap: 15px;
		max-width: 600px;
	}
}
</style>
