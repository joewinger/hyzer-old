module.exports = (req, res) => {
  const Airtable = require('airtable');
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

  const { body } = req;

  base('Reviews').update([
    {
      'id': body.reviewId,
      'fields': {
        'content': body.content
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      res.status(500).send('Error');
      return;
    }
    records.forEach((record) => {
      console.log(`Review ${record.getId()} updated`);
    });
    res.status(201).send('OK');
  });
}