<template>
	<canvas id="flightPath" width=300 height=500></canvas>
</template>

<script>
import FlightPath from '~/assets/flightpath.js';

export default {
	name: 'FlightPath',
	props: {
		options: Object
	},
	mounted() {
		const flightPath = new FlightPath({ elementId: 'flightPath'});
		flightPath.drawGrid();
		flightPath.drawPath(this.options);
	}
}
</script>

<style>
#flightPath {
	margin-top: 10px;
	padding: 0;
	margin: auto;
	display: block;
	width: 300px;
	border-radius: 15px;
}
</style>