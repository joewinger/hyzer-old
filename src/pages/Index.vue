<template>
	<Layout>
		<!-- <img src="@/logo.svg" alt=""> -->

		<div id="about">
			<p>Hyzer is the one-stop shop for disc research and discovery.</p>
			<p>Our goal is to make a product that people love, so please feel free to give us feedback and suggestions :)</p>
		</div>
		
		<input type="text" name="search" id="search" v-model="query" placeholder="Search for a disc">
		<h1>Discs</h1>
		<ul id="resultList">
			<li v-for="disc in filteredDiscs" :key="disc.node.id" class="result">
				<g-link :to="`/disc/${disc.node.slug}/`">
					<span class="name">{{ disc.node.name }}</span>
					<span class="manufacturer">{{ disc.node.manufacturer.name }}</span>
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
			}
		}
	}
}
</page-query>

<script>/*
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

export default {
	metaInfo: {
		title: 'Home'
	},
	data: function() {
		return {
			query: ''
		}
	},
	computed: {
		filteredDiscs: function() {
			return this.$page.discs.edges.filter(disc => !disc.node.name.toLowerCase().indexOf(this.query.toLowerCase()));
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

#resultList {
	list-style: none;
	margin: 0;
	padding: 0;
}

.result {
	margin-bottom: 10px;

	border-radius: 7px;
	box-shadow:
		0 0 0 1px rgba( 56, 60, 79, 0.23),
		0 2px 4px rgba(20, 40, 60, 0.3),
		0 5px 15px -10px rgba( 36, 38, 50, 0.25);

	transition: all 1s;
}
.result > a {
	display: flex;
	justify-content: space-between;

	box-sizing: border-box;
	width: 100%;
	padding: 20px;

	text-decoration: none;
	color: var(--text-color) !important;

	cursor: pointer;
}
.result > a > .manufacturer {
	font-size: 0.9em;
	opacity: 0.8;
	font-style: italic;
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