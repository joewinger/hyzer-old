module.exports = (req, res) => {
  const Airtable = require('airtable');
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);
  
  base('Reviews').select({
    filterByFormula: `AND(disc_id = '${req.query.disc}', published = TRUE())`,
    fields: ['user', 'content', 'name', 'created_at', 'id'],
    sort: [{ field: 'created_at', direction: 'desc'}]
    // pageSize: 100
  }).firstPage((err, records) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error');
      return;
    }
    let reviews = [];
    records.forEach(record => {
        reviews.push(record.fields);
    });

    res.json(reviews);
  });
}