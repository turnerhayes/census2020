const express = require('express');
const request = require('request-promise-native');
const Config = require('../../../server/config');
const router = express.Router();

router.route('/').get((req, res, next) => {
  const schema = req.secure ? 'https' : 'http';
  const redirectUrl = new URL(req.originalUrl, `${schema}://${req.headers.host}`);
  redirectUrl.pathname += '/callback';
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', Config.github.appId);
  url.searchParams.set('redirect_uri', redirectUrl.toString());
  url.searchParams.set('scope', 'public_repo');
  res.redirect(url);
});

router.route('/callback').get(async (req, res, next) => {
  const { code } = req.query;
  try {
    const response = await request.post('https://github.com/login/oauth/access_token', {
      body: {
        code,
        client_id: Config.github.appId,
        client_secret: Config.github.appSecret
      },
      headers: {
        Accept: 'application/json'
      },
      json: true
    });
    if (response.error) {
      throw new Error(response.error_description);
    }
    const url = new URL(req.baseUrl.replace(/\/auth\/?$/, ''), `http://${req.headers.host}`);
    url.searchParams.set('access_token', response.access_token);
    res.redirect(url);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
