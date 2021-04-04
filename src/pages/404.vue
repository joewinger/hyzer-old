<template>
	<Layout>
        <center>
            <h1 class="title-404">404</h1>
            <h2>You've gone too far out of bounds!</h2>
        </center>
        <p>Looks like we can't find what you're looking for. <a href='mailto:feedback@hyzer.us'>Let us know</a> if it's something you'd like to see in the future :)</p>
	</Layout>
</template>

<script>

export default {
	components: {
	},
	metaInfo() {
		return {
			title: '404 :('
		}
	},
}
</script>

<style>
.title-404 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    font-size: 2rem;
    border: solid 3px #555;
    line-height: 1.2;
    padding: 13px 10px;
    border-radius: 10px;
}
</style>