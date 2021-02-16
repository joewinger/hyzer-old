// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: 'Hyzer',
	plugins: [
		{
			use: '@gridsome/source-airtable',
			options: {
				apiKey: process.env.AIRTABLE_API_KEY, // required
				base: process.env.AIRTABLE_BASE_ID, // required
				tables: [
					{
						name: 'Discs', // required
						typeName: 'Disc', // required
						select: {
							filterByFormula: '{published} = TRUE()'
						}, // optional,
						links: [ // optional
							{
								fieldName: 'manufacturer',
								typeName: 'Manufacturer',
								linkToFirst: true // Just return the manufacturer, not an array containing the manufacturer
							},
							{
								fieldName: 'plastics',
								typeName: 'Plastic'
							}
						]
					},
					{
							name: 'Manufacturers',
							typeName: 'Manufacturer',
					},
					{
							name: 'Plastics',
							typeName: 'Plastic',
					},
				]
			},
		},
	],
	templates: {
		Disc: `/disc/:slug`, // optional
	},
}

// module.exports = {
//   siteName: 'Hyzer',
//   plugins: [
//     {
//       use: '@gridsome/source-strapi',
//       options: {
//         apiURL: 'http://api.hyzer.us/',
//         queryLimit: 1000, // Defaults to 100
//         contentTypes: ['discs', 'manufacturers', 'plastics'],
//         singleTypes: [],
//         // Possibility to login with a Strapi user,
//         // when content types are not publicly available (optional).
//         loginData: {
//           identifier: '',
//           password: ''
//         }
//       }
//     }
//   ]
// }
