<template>
	<Layout>
		<div id="about">
			<p>Hyzer is the one-stop shop for disc research and discovery.</p>
			<p>Our goal is to make a product that people love, so please feel free to give us feedback and suggestions :)</p>
		</div>
		
		<input type="text" name="search" id="search" v-model="query" placeholder="Search for a disc">
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<h1>Discs</h1>
			<ul class="sort-options">
				<li class="sort-option" :class="{ active: sortmode==='alphabetical' }" @click="sortmode='alphabetical'">Name</li>
				<li class="sort-option" :class="{ active: sortmode==='stability_dec' }" @click="sortmode='stability_dec'">Stability</li>
				<li class="sort-option" :class="{ active: sortmode==='manufacturer' }" @click="sortmode='manufacturer'">Manufacturer</li>
			</ul>
		</div>
		<ul id="resultList">
			<li v-for="disc in filteredDiscs" :key="disc.node.id" class="result">
				<g-link :to="`/disc/${disc.node.slug}/`">
					<disc-link :disc="disc.node" />
				</g-link>
			</li>
			<div class="noresults" v-if="filteredDiscs.length === 0">
				<p>
					Looks like we don't have that one yet :(<br/>
					<a href='mailto:feedback@hyzer.us'>Let us know</a> if it's something you'd like!
				</p>
			</div>
		</ul>
	</Layout>
</template>

<page-query>
query Discs {
	discs: allDisc {
		edges {
			node {
				id
				name
				slug
				manufacturer {
					name
				}
				speed
				glide
				turn
				fade
				stability
			}
		}
	}
}
</page-query>

<script>/*
import DiscLink from '../components/DiscLink.vue';
<page-query>
query {
	discs: allStrapiDiscs {
		edges {
			node {
				id
				name
				slug
				manufacturer {
					name
				}
			}
		}
	}
}
</page-query>
*/
</script>

<script>
import DiscLink from '~/components/DiscLink.vue'

export default {
	components: { DiscLink },
	metaInfo: {
		title: 'Home'
	},
	data: function() {
		return {
			query: '',
			sortmode: 'manufacturer'
		}
	},
	computed: {
		filteredDiscs: function() {
			let discs = this.$page.discs.edges.filter(disc => !disc.node.name.toLowerCase().indexOf(this.query.toLowerCase())).sort((a, b) => {
				if (this.sortmode === 'alphabetical' || this.sortmode === 'manufacturer') {
					if (a.node.name.toLowerCase() < b.node.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				}
				if (this.sortmode === 'stability_dec') return b.node.stability - a.node.stability
				if (this.sortmode === 'stability_asc') return a.node.stability - b.node.stability
			});
			if (this.sortmode ==='manufacturer') { // We split it up like this so it sorts by alphabet first
				discs.sort((a, b) => {
					if (a.node.manufacturer.name.toLowerCase() < b.node.manufacturer.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				})
			}
			return discs;
		}
	}
}
</script>

<style scoped>
#about {
	margin: 35px 0;
	border-radius: 15px;
}

#search {
	width: 100%;
	padding: 10px 12px;
	margin: 10px 0;
	box-sizing: border-box;
	border: solid 1px rgba(56, 60, 79, 0.3);
	border-radius: 100px;

	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;

	font-size: 0.9rem;
}
#search:focus {
	outline: 0;
	box-shadow: 0 0 0 1px rgba(56, 60, 79, 0.4);
}

.sort-options {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	font-size: 0.65em;
	width: auto;
	padding: 0;

	border-radius: 15px;
	background: rgba(180, 190, 200, 0.4);
	box-shadow: 0 0 0 1px rgba(122, 130, 138, 0.4);

	list-style: none;
}
.sort-option {
	display: inline-block;
	border-radius: 15px;
	padding: 5px 8px;
}
.sort-option.active {
	background: rgba(180, 190, 200, 0.8);
	box-shadow: 0 0 0 1px rgba(56, 60, 79, 0.3);

}

#resultList {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 10px;
}

.result a {
	color: var(--text-color);
	text-decoration: none;
}

.noresults {
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;

	opacity: 0.4;
	font-size: 0.9rem;
}

.noresults a {
	color: var(--text-color);
	text-decoration: none;
	border-bottom: dotted 1px;
}
</style>