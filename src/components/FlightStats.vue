<template>
	<div id='flightStats'>
		<div class='flightNumber'>
			<label>Speed</label>
			<progress-bar :min=1 :max=14 :value=stats.speed :backgroundColor="'var(--stat-bar-speed-bg)'" :foregroundColor="'var(--stat-bar-speed-fg)'"/>
		</div>

		<div class='flightNumber'>
			<label>Glide</label>
			<progress-bar :min=1 :max=6 :value=stats.glide :backgroundColor="'var(--stat-bar-glide-bg)'" :foregroundColor="'var(--stat-bar-glide-fg)'" />
		</div>

		<div class='flightNumber'>
			<label>Turn</label>
			<progress-bar :min=-5 :max=1 :value=stats.turn :backgroundColor="'var(--stat-bar-turn-bg)'" :foregroundColor="'var(--stat-bar-turn-fg)'" />
		</div>

		<div class='flightNumber'>
			<label>Fade</label>
			<progress-bar :min=0 :max=5 :value=stats.fade :backgroundColor="'var(--stat-bar-fade-bg)'" :foregroundColor="'var(--stat-bar-fade-fg)'" />
		</div>
		
		<div class='flightStability'>
			<label>Stability</label>
			<progress-bar :min=-100 :max=100 :value=stabiliy suffix="%" :backgroundColor="'var(--stat-bar-stability-bg)'" :foregroundColor="'var(--stat-bar-stability-fg)'" />
			<ol class='labels'>
				<li>Understable</li>
				<li>Overstable</li>
			</ol>
		</div>
	</div>
</template>

<script>
import ProgressBar from './ProgressBar.vue'

export default {
	components: { ProgressBar },
	name: 'FlightStats',
	props: {
		'stats': Object
	},
	computed: {
		stabiliy() { return  this.stats.lsf + this.stats.hst; }
	}
}
</script>

<style>
#flightStats {
	margin-top: 10px;

	display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
}

.flightNumber > label,
.flightStability > label {
	margin: 0;
	padding: 0;

	font-weight: 500;
	font-size: 0.9rem;
}

.flightStability {
	grid-column: 1 / span 2;
}
.flightStability > .labels {
	list-style: none;
	width: 100%;
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: space-between;
}
.flightStability > .labels > li {
	font-weight: 500;
	margin-left: 5px;
	font-size: 0.75rem;
	opacity: 0.8;
				
	width: 100px;
}
.flightStability > .labels > li:last-of-type {
	display: flex;
	flex-direction: row-reverse;
}
</style>