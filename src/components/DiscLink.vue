<template>
	<div class="disclink">
        <div class="disc-info">
            <span class="name">{{ disc.name }}</span>
            <span class="manufacturer">{{ disc.manufacturer.name }}</span>
        </div>
		<div class="flight-numbers">
			<div class="flight-number" :style="{'background-color': 'var(--stat-bar-speed-fg)'}">{{ disc.speed }}</div>
			<div class="flight-number" :style="{'background-color': 'var(--stat-bar-glide-fg)'}">{{ disc.glide }}</div>
			<div class="flight-number" :style="{'background-color': 'var(--stat-bar-turn-fg)'}">{{ disc.turn }}</div>
			<div class="flight-number" :style="{'background-color': 'var(--stat-bar-fade-fg)'}">{{ disc.fade }}</div>
            <progress-bar class="progress" :min=-100 :max=100 :value=disc.stability suffix="%" :backgroundColor="'var(--stat-bar-stability-bg)'" :foregroundColor="'var(--stat-bar-stability-fg)'" />
		</div>
	</div>
</template>

<script>
import ProgressBar from './ProgressBar.vue'

export default {
	components: { ProgressBar },
	name: 'DiscLink',
	props: {
		'disc': Object
	},
}
</script>

<style>
.disclink {
	display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
	box-sizing: border-box;
	padding: 15px;
	border-radius: 7px;
	box-shadow:
		0 0 0 1px rgba( 56, 60, 79, 0.23),
		0 2px 4px rgba(20, 40, 60, 0.3),
		0 5px 15px -10px rgba( 36, 38, 50, 0.25);
		
	transition: all 1s;

    width: 100%;
}

.disc-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.name {
	display: block;
	font-weight: 500;
}
		
.manufacturer {
	font-size: 0.9em;
}
		
.flight-numbers {
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr 1fr 1fr;
    grid-gap: 2px 16px;
}
.flight-number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    box-sizing: border-box;
    grid-row: 1;
}
.progress {
    height: 25px;
    grid-row: 2;
    grid-column: 1 / span 4;
}
.progress .value {
    height: 22px;
}
</style>