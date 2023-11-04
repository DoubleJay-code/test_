<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<{
	prefix?: string
	name?: string
}>(), {
	prefix: 'icon',
	name: ''
})

const symbolId = computed(() => {
	return `#${props.prefix}-${props.name}`
})
</script>

<template>
	<svg aria-hidden="true" class="ui-svg">
		<use :href="symbolId" />
	</svg>
</template>
