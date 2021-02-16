<template>
	<div id='description'>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'Description'
}
</script>

<style>
#description {
	margin-top: 20px;
	line-height: 1.5;
	border-left: solid 2px #42554E55;
	padding-left: 12px;
	margin-left: -6px;
}
</style>