<template>
	<div class='bar' :style="{ 'background-color':  backgroundColor }">
		<div class='value' ref='value' :style="{ 'background-color': foregroundColor, 'width': `${width}%` }"><span ref='valuetext' :class="{'valuetext': true, 'tinybar': this.tinybar}">{{ value }}{{ suffix || '' }}</span></div>
	</div>
</template>

<script>
export default {
	name: 'ProgressBar',
	props: {
		min: Number,
		max: Number,
		value: Number,
		suffix: String,
		backgroundColor: String,
		foregroundColor: String
	},
	data() {
		return {
			tinybar: false
		}
	},
	methods: {
		mapScale: function(num, in_min, in_max, out_min, out_max) {
  			return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
		}
	},
	computed: {
		width() { return this.mapScale(this.value, this.min, this.max, 0, 100) },
	},
	mounted() {
    	this.$nextTick(() => {
        	this.tinybar = this.$refs.valuetext.clientWidth*1.3 > this.$refs.value.clientWidth;
    	});
	}
}
</script>

<style>
.bar {
	--bar-height: 30px;
	--bar-gutter: 3px;

	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	width: 100%;
	height: var(--bar-height);
	box-sizing: border-box;
	padding: 0 var(--bar-gutter);
	border-radius: 100px;
}
.value {
	height: calc(var(--bar-height) - calc(var(--bar-gutter) * 2));
	min-width: calc(var(--bar-height) - calc(var(--bar-gutter) * 2)) !important;

	position: relative;

	font-weight: 500;
	box-sizing: border-box;
	padding-right: 5px;
	font-size: 0.9rem;

	border-radius: 100px;

	display: flex;
	justify-content: flex-end;
	align-items: center;

}
.valuetext.tinybar {
	position: absolute;
	left: 5px;
	border: solid salmon 1px;
}
</style>