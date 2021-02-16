// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const slugify = require('slugify');

module.exports = function (api) {
	api.loadSource(({ addCollection }) => {
		// Use the Data Store API here: https://gridsome.org/docs/data-store-api/

		// const Blogs = require('./src/data/blogs.json');

		// const collection = actions.addCollection({
		//   typeName: 'BlogPosts'
		// })
	
		// for (const blog of Blogs) {
		//   collection.addNode(blog);
		// }
	})

	api.createPages(async ({ createPage, graphql }) => {
		
		// const { data } = await graphql(`{
		// 	discs: allStrapiDiscs {
		// 		edges {
		// 			disc: node {
		// 				id
		// 				slug
		// 			}
		// 		}
		// 	}
		// }`);

		// console.log(JSON.stringify(data));

		// const discs = data.discs.edges;

		// discs.forEach(node => {
		// 	createPage({
		// 		path: `/disc/${node.disc.slug}`,
		// 		component: './src/templates/Disc.vue',
		// 		context: {
		// 			id: node.disc.id
		// 		}
		// 	});
		// });

	})
}
