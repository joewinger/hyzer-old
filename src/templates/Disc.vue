<template>
	<Layout>
		<g-image id="hero" src="~/assets/coming-soon.png" />

		<div id="title">
			<h1 id="name" v-html="$page.disc.name" />
			<h2 id="manufacturer" v-html="$page.disc.manufacturer.name" />
			<div id="type">{{ $page.disc.type }}</div>
		</div>
		<description>
			{{ $page.disc.description }}
		</description>

		<hr />

		<h2>Flight Stats</h2>
		<flight-stats :stats="{
			speed: $page.disc.speed,
			glide: $page.disc.glide,
			turn: $page.disc.turn,
			fade: $page.disc.fade,
			stability: $page.disc.stability
		}" />

		<section id='section-flight-path' v-if="$page.disc.distance !== null">
			<hr />

			<h2>Flight Path</h2>
			<flight-path :options="{
				distance: $page.disc.distance,
				hst: $page.disc.hst,
				lsf: $page.disc.lsf,
				armspeed: 1,
			}" />
		</section>

		<section id="section-plastics" v-if="$page.disc.plastics.length !== 0">
			<hr />

			<h2>Available Plastics</h2>
			<available-plastics :available-plastics="$page.disc.plastics" />
		</section>
		
		<section id="section-reviews">
			<hr />

			<h2>Reviews ({{ numReviews }})</h2>
			<reviews :disc-id="$page.disc.id" @update-review-count="updateReviewCount"/>
		</section>
	</Layout>
</template>

<page-query>
query ($id: ID!) {
	disc(id: $id) {
		id
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
		stability
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
import Reviews from '~/components/Reviews.vue';

export default {
	components: {
		Description,
		FlightStats,
		FlightPath,
		AvailablePlastics,
		Reviews
	},
	metaInfo() {
		return {
			title: this.$page.disc.name
		}
	},
	data() {
		return {
			numReviews: 0
		}
	},
	methods: {
		updateReviewCount: function(e) {
			this.numReviews = e
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
	line-height: 1.0;
}

#title > #manufacturer {
	margin: -6px 0 0 2px; /* 2px on the left looks more normal when the disc name starts with a T or something where the decender isn't on the left */

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