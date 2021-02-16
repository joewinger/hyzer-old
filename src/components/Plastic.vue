<template>
	<li class="plastic">
		<span class="name">{{ plastic.name }}</span>
		<span class="description">{{ plastic.description }}</span>
		<ul class="tags">
			<li class="tag" v-for="tag in plastic.tags" :key="tag">{{ tag }}</li>
		</ul>
	</li>
</template>

<script>

export default {
	name: 'Plastic',
	props: {
		'plastic': Object
	},
}
</script>

<style>
.plastic {
	display: inline-block;
	box-sizing: border-box;
	padding: 15px;
	border-radius: 10px;
		
	box-shadow:
		5px 5px 0px #DAEBEC,
		0 8px 16px -8px hsla(0, 30%, 30%, 0.3),
		0 5px 16px 6px #EFF8F8;
		
		/* border: solid 2px #42554E55; */
		/* border-radius: 15px; */
}

.name {
	display: block;
	font-weight: 500;
}
		
.description {
	display: block;
	margin-top: 15px;
	font-size: 0.9em;
}
		
.tags {
	display: flex;
	flex-direction: row;
	align-items: center;
		
	margin: 15px 0 0 0;
	padding: 0;
}

.tag {
	margin-right: 5px;
	font-family: 'Rubik', sans-serif;
	font-size: 0.9rem;
	padding: 5px 10px;
	background: #DAEBEC;
	border-radius: 50px;
	display: inline-block;
	width: intrinsic;           /* Safari/WebKit uses a non-standard name */
	width: -moz-max-content;    /* Firefox/Gecko */
	width: -webkit-max-content; /* Chrome */
	width: max-content;
}
.tag:last-of-type {
	margin-right: 0;
}
</style>