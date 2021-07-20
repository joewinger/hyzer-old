<template>
    <div id="reviews" :key="discId">
			<!-- Standard Reviews -->
			<div class="review" v-for="review in currentPageOfReviews" :key="review.id">
				<p class="review-content">{{ review.content }}</p>
				<cite class="review-name">{{ review.name }}</cite>
			</div>
			<!-- Our Review (if we have one, and if we're on page 1) -->
			<div class="review myreview" v-if="myReview !== null && this.currentPage === 1">
				<h3 class="myreview-label">Your Review</h3>
				<!-- Standard (non-edit) Mode -->
				<p class="review-content" v-if="!editMode">{{ myReview.content }}</p>
				<a class="myreview-edit-btn" @click.prevent="enableEditMode()" v-if="!editMode"><img src="../assets/edit.svg" />&nbsp;edit</a>
				<!-- Edit Mode-->
				<textarea class="review-content" v-if="editMode" v-model="editedReview" />
				<div class="editButtons" v-if="editMode">
					<button @click="editMode=false">Cancel</button>
					<button @click="updateReview()">Save Changes</button>
				</div>
			</div>
			<!-- Pagination Controls -->
			<div class="reviews-pagination" v-if="totalPages > 1">
				<a @click.prevent="previousPage()"><img src="../assets/chevron-left.svg" /></a>
				Page {{currentPage}}/{{totalPages}}
				<a @click.prevent="nextPage()"><img src="../assets/chevron-right.svg" /></a>
			</div>
			<!-- Submit New Review -->
			<div class="review" v-if="this.$auth.isAuthenticated() && myReview === null">
				<textarea class="review-content" v-model="newReviewContent" placeholder="Write your own review here! :)" />
				<button style="align-self: flex-end" @click="submitNewReview()">Submit Review</button>
			</div>
			<!-- If we're not logged in & there's no reviews -->
			<p class="noreviews" v-if="allReviews.length === 0 && this.$auth.isAuthenticated() === false">Looks like there's nothing to see here... Try checking back later!</p>
    </div>
</template>

<script>
export default {
	name: 'Reviews',
	props: {
		'discId': String
	},
	data() {
		return {
			allReviews: [], // All reviews
			newReviewContent: '',
			submittedLoading: false,
			currentPage: 1,
			reviewsPerPage: 4,
			editMode: false,
			editedReview: ''
		}
	},
	computed: {
		currentPageOfReviews: function() {
			let isAuth = this.$auth.isAuthenticated();
			if (isAuth && this.myReview !== null) {
				let reviews = this.allReviews.filter(review => review.user !== JSON.parse(localStorage.user).sub);
				// We want to show 3 reviews on page 1, plus our review, for 4 total reviews
				let numReviewsToShowThisPage = this.currentPage === 1 ? this.reviewsPerPage-1 : this.reviewsPerPage;
				let index = ((this.currentPage-1) * numReviewsToShowThisPage);
				if (index > 0) index--;
				let currentReviews = reviews.slice(index, index + numReviewsToShowThisPage);
				
				return currentReviews;
			} else {
				let index = ((this.currentPage-1) * this.reviewsPerPage);
				let currentReviews = this.allReviews.slice(index, index + this.reviewsPerPage);
				
				return currentReviews;
			}
		},
		/**
		 * @returns our review object, or null if we're not authenticated or haven't written a review
		 */
		myReview: function() {
			if (this.$auth.isAuthenticated()) {
				let myReview = this.allReviews.find(review => review.user === JSON.parse(localStorage.user).sub);
				if (myReview === undefined) return null;
				return myReview;
			} else return null;
		},
		totalPages: function() {
			return Math.ceil(this.allReviews.length / this.reviewsPerPage);
		}
	},
	methods: {
		submitNewReview: function() {
			if(this.newReviewContent === '') return;
			fetch('/api/v0/submitReview', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.access_token
				},
				body: JSON.stringify({
					disc: this.discId,
					content: this.newReviewContent,
					name: JSON.parse(localStorage.user).name
				})
			}).then(response => {
				if(!response.ok) console.error(response);
				this.submittedLoading = false;
				this.newReviewContent = '';
				this.getReviews();
			}).catch(e => {
				console.error(`${e.type}: ${e.message}`);
			});
		},
		updateReview: function() {
			if(this.editedReview === '') return;
			fetch('/api/v0/updateReview', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.access_token
				},
				body: JSON.stringify({
					reviewId: this.myReview.id,
					content: this.editedReview
				})
			}).then(response => {
				if(!response.ok) console.error(response);
				this.submittedLoading = false;
				this.newReviewContent = '';
				this.getReviews();
				this.editMode = false;
			}).catch(e => {
				console.error(`${e.type}: ${e.message}`);
			});;
		},
		getReviews: async function() {
			let response;
			try {
				 response = await fetch('/api/v0/getReviews?' + new URLSearchParams({ disc: this.discId }))
				if(!response.ok) { console.error(response); return; }
				
				let reviews = await response.json();
				this.allReviews = reviews;
				this.$emit('update-review-count', reviews.length);
			} catch (e) {
				console.error(`${e.type}: ${e.message}`);
			}
		},
		nextPage() {
			if(this.currentPage < this.totalPages) this.currentPage++;
		},
		previousPage() {
			if(this.currentPage > 1) this.currentPage--;
		},
		enableEditMode() {
				this.editedReview = this.myReview.content;
				this.editMode = true;
		},
		onRouteChange() {
			this.getReviews();
			this.currentPage = 1;
		}
	},
	created() {
		this.getReviews();
		this.editedReview = this.myReview !== null ? this.myReview.content : '';
	},
  watch: {
    // call again the method if the route changes
    '$route': 'onRouteChange'
  },
}
</script>

<style>
#reviews {
	display: flex;
	flex-direction: column;
	
  padding: 0;
	margin: 16px 0;
  
	gap: 1em;
	list-style: none;
}

h3.myreview-label {
	margin: 0;
	font-size: 1em;
	align-self: center;
}
.myreview-edit-btn {
	display: flex;
	flex-direction: row;
	align-items: center;
	align-self: flex-end;
}

.review {
	display: flex;
	flex-direction: column;

	box-sizing: border-box;
	width: 100%;
	padding: 15px;
		
	border-radius: 10px 20px 10px 10px;
		
	/* border: solid 2px rgba(60, 64, 67, 0.6); */
	/* border-left: solid 5px rgba(60, 64, 67, 0.6); */
	border-bottom: solid 2px rgba(60, 64, 67, 0.4);
	/* border-radius: 0px 40px 10px 0px; */
	box-shadow: rgba(60, 64, 67, 0.034) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}
.review > .review-name {
	align-self: flex-end;
}

.reviews-pagination {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
textarea {
	outline: none;
	border: solid 0;
	resize: none;
	font-family: inherit;
	font-size: inherit;
	margin: 16px 0;
	padding: 5px;
	border-radius: 7px;
	background: rgba(60, 64, 67, 0.1)
}

.editButtons {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.editButtons > button {
	width: 48%;
}

p.noreviews {
	opacity: 0.6;
}
</style>