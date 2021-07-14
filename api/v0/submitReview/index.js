module.exports = (req, res) => {
  const Airtable = require('airtable');
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

  const { body } = req;

  base('Reviews').create([
    {
      'fields': {
        'user': body.user,
        'disc': [
          body.disc
        ],
        'content': body.content,
        'published': true,
        'name': body.name
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      res.status(500).send('Error');
      return;
    }
    records.forEach((record) => {
      console.log(`New review for ${record.getId()}`);
    });
    res.status(201).send('OK');
  });
}