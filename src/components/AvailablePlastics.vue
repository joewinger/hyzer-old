<template>
    <ol id="availablePlastics">
        <plastic v-for="plastic in availablePlastics" :key="plastic.name" :plastic="plastic" />
    </ol>
</template>

<script>
import Plastic from './Plastic.vue';

export default {
	components: { Plastic },
	name: 'AvailablePlastics',
	props: {
		'availablePlastics': Array
	},
}
</script>

<style>

#availablePlastics {
	list-style: none;
	display: grid;
    grid-gap: 1em;
    padding: 0;
}
</style>