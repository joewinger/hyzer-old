<template>
	<Layout>
		<g-image id="hero" src="~/assets/coming-soon.png" />
		<!-- <img id="hero" src="https://cdn.shopify.com/s/files/1/0063/8389/4580/products/INCE-Thunderbird-2X_zpsmrdypvsq_1400x.jpg?v=1571748402" /> -->

		<div id="title">
			<h1 id="name" v-html="$page.disc.name" />
			<h2 id="manufacturer" v-html="$page.disc.manufacturer.name" />
			<div id="type">{{ $page.disc.type }}</div>
		</div>
		<Description>
			{{ $page.disc.description }}
		</Description>

		<hr />

		<h2>Flight Stats</h2>
		<flight-stats :stats="{
			speed: $page.disc.speed,
			glide: $page.disc.glide,
			turn: $page.disc.turn,
			fade: $page.disc.fade,
			hst: $page.disc.hst,
			lsf: $page.disc.lsf
		}" />

		<hr />

		<h2>Flight Path</h2>
		<flight-path :options="{
			distance: $page.disc.distance,
			hst: $page.disc.hst,
			lsf: $page.disc.lsf,
			armspeed: 1,
		}" />

		<hr v-if="$page.disc.plastics.length !== 0" />

		<h2 v-if="$page.disc.plastics.length !== 0">Available Plastics</h2>
		<available-plastics :availablePlastics="$page.disc.plastics" />
	</Layout>
</template>

<page-query>
query ($id: ID!) {
	disc(id: $id) {
		name
		manufacturer {
			name
		}
		type
		description
		speed
		glide
		turn
		fade
		distance
		hst
		lsf
		plastics {
			name
			description
			tags
		}
	}
}
</page-query>

<script>
import Description from '~/components/Description.vue';
import FlightStats from '~/components/FlightStats.vue';
import AvailablePlastics from '~/components/AvailablePlastics.vue';
import FlightPath from '~/components/FlightPath.vue';

export default {
	components: {
		Description,
		FlightStats,
		FlightPath,
		AvailablePlastics
	},
	metaInfo() {
		return {
			title: this.$page.disc.name
		}
	}
}
</script>

<style>
img#hero {
	width: 300px;
	height: 300px;
	border-radius: 25px;
	background: #E9E9E9;
	margin: 0 auto;
	margin-top: 15px;
	box-shadow:
		0 0 0 1px rgba(0, 0, 0, 0.1),
		0 0px 20px -5px hsla(240, 30.1%, 28%, 0.25),
		0 8px 16px -8px hsla(0, 0%, 0%, 0.3),
		0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
}

#title {
	margin-top: 10px;
}

#title > #name {
	margin: 0;
	padding-bottom: 0;

	font-family: 'Rubik', sans-serif;
	font-size: 3rem;
	font-weight: 700;
}

#title > #manufacturer {
	margin: -18px 0 0 2px; /* 2px on the left looks more normal when the disc name starts with a T or something where the decender isn't on the left */

	font-family: 'Rubik', sans-serif;
	font-weight: 200;
	font-style: italic;
	letter-spacing: 3px;
	text-transform: uppercase;
	font-size: 0.9rem;
}
	
#title > #type {
	width: -moz-max-content;    /* Firefox/Gecko */
	width: -webkit-max-content; /* Chrome */
	width: max-content;
	width: intrinsic;           /* Safari/WebKit uses a non-standard name */
	margin-top: 10px;
	padding: 5px 10px;
	display: inline-block;

	border-radius: 50px;
	background: var(--disc-type-chip-color);
	
	font-family: 'Rubik', sans-serif;
	font-size: 0.9rem;
}
</style>