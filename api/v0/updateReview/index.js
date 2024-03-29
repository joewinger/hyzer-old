module.exports = async (req, res) => {
  const { body, headers } = req;

  const { getTokenFromHeader, JwtVerifier, JwtVerifierError } = require('@serverless-jwt/jwt-verifier');
  const jwt = new JwtVerifier({
    issuer: 'https://hyzer.us.auth0.com/',
    audience: 'https://hyzer.us/api/v0'
  });

  const Airtable = require('airtable');
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

  try {
    const claims = await jwt.verifyAccessToken(getTokenFromHeader(headers.authorization));
    // Has permissons?
    if(!claims.permissions.includes('update:reviews')) res.status(403).send('Error: missing permisson update:reviews');
    // Current token?
    if(claims.exp >= Date.now()) res.status(403).send('Error: Access Token expired :(');

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
        console.log(`Review ${record.getId()} updated to "${record.fields.content}"`);
      });
      res.status(201).send('OK');
    });
  } catch (e) {
    if(typeof e === JwtVerifierError) {
      res.status(403).send('Authentication Error');
    }
    console.error(e.code, e.message);
    res.status(500).send(`${e.code}: ${e.message}`);
  }
}