var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  const { params, query } = req;
  res.json({ ...params, ...query });
});

router.post('/', function (req, res, next) {
  const { body } = req;
  res.json(body);
});

module.exports = router;
