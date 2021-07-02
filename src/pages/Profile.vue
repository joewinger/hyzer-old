<template>
	<Layout>
		<div class="profile">
			<h1>Edit Profile</h1>
			<img v-if="this.$auth.isAuthenticated()" :src="$auth.user.picture">
			<div class="profile-input">
				<label for="profile-name">Name</label>
				<input id="profile-name" type="text" v-model="name" />
				<p>What you'd like people to call you around here</p>
			</div>
			<div class="profile-input">
				<label for="profile-email">Email Address</label>
				<input id="profile-email" type="email" v-model="email" />
				<p>This one's obvious</p>
			</div>
			<div class="profile-input">
				<label for="profile-pdgaNum">PDGA #</label>
				<input id="profile-pdgaNum" type="number" v-model="pdgaNum" placeholder=""/>
				<p>If you'd like to flex</p>
			</div>
			<div class="profile-input">
				<label for="profile-location">Location</label>
				<input id="profile-location" type="text" v-model="location"/>
				<p>Where you're from</p>
			</div>
			<button @click="update()" disabled>Update Profile (Soon)</button>
			<pre>{{ $auth.user.sub }}</pre>
		</div>
	</Layout>
</template>

<script>
let isBrowser = false;
try {
	isBrowser = typeof window !== 'undefined';
} catch {
	isBrowser = false;
}
export default {
	metaInfo: {
		title: 'Profile'
	},
	data() {
		return {
			name: isBrowser ? this.$auth.user.name : '',
			email: isBrowser ? this.$auth.user.email : '',
			location: '',
			pdgaNum: ''
		}
	},
	methods: {
		update: function() {
			console.log("Info \"updated\" ;)");
		}
	},
	created() {
		if(isBrowser) {
			if(!this.$auth.isAuthenticated()) this.$auth.login();
		}
	}
}
</script>

<style scoped>
.profile {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
}

h1 {
	font-size: 2.5rem;
	align-self: flex-start;
}

img {
	width: 140px;
	margin-bottom: 10px;
	align-self: center;

	border-radius: 20%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.profile-input {
	position: relative;
	width: 100%;
	margin: 5px 0;

	box-sizing: border-box;
}
.profile-input > label {
	position: absolute;
	top: 4px;
	left: 8px;
	font-size: 12px;

	transition: transform .2s ease-in-out;
	transform-origin: top left;
}
.profile-input > input,
.profile-input > textarea {
	width: 100%;
	box-sizing: border-box;
	padding: 24px 8px 8px 8px;

	background: #F2F2F2;
	border: 0 solid;
	border-radius: 10px;

	font-size: 20px;
}
.profile-input > textarea {
	resize: none;
	height: 140px;
	font-family: 'Inter', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;

}
.profile-input > p {
  font-size: 12px;
	margin: 4px 0 0 4px;
}

button {
	align-self: center;

	width: 100%;
	max-width: 350px;

	padding: 15px;
	font-size: 18px;
	border: solid 3px black;
	border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

pre {
	align-self: flex-end;
}
</style>
