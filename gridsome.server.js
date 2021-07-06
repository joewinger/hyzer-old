// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);
const bodyParser = require('body-parser');

module.exports = function (api) {

	api.configureServer(app => {
		app.use(bodyParser.json());
		app.post('/api/v0/submitReview', (req, res) => {
			base('Reviews').create([
				{
					'fields': {
						'user': req.body.user,
						'disc': [
							req.body.discId
						],
						'content': req.body.content,
						'published': true,
						'name': req.body.name
					}
				}
			], function(err, records) {
				if (err) {
					console.error(err);
					res.sendStatus(500).end();
					return;
				}
				records.forEach((record) => {
					console.log(`New review for ${record.getId()}`);
				});
				res.sendStatus(201).end();
			});
		});
		app.post('/api/v0/updateReview', (req, res) => {
			base('Reviews').update([
				{
					'id': req.body.reviewId,
					'fields': {
						'content': req.body.content
					}
				}
			], function(err, records) {
				if (err) {
					console.error(err);
					res.sendStatus(500).end();
					return;
				}
				records.forEach((record) => {
					console.log(`Review ${record.getId()} updated`);
				});
				res.sendStatus(201).end();
			});
		});
		app.get('/api/v0/getReviews', (req, res) => {
			base('Reviews').select({
				filterByFormula: `AND(disc_id = '${req.query.discId}', published = TRUE())`,
				fields: ['user', 'content', 'name', 'created_at', 'id'],
				sort: [{ field: 'created_at', direction: 'desc'}]
				// pageSize: 100
			}).firstPage((err, records) => {
				if (err) {
					console.error(err);
					res.sendStatus(500).end();
					return;
				}
				let reviews = [];
				records.forEach(record => {
						reviews.push(record.fields);
				});

				res.send(reviews);
			});
		});
	})
}
