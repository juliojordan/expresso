var express = require('express');
var router = express.Router();

const { S3 } = require('aws-sdk');
const { v1: uuid } = require('uuid');

const fs = require('fs');
const path = require('path');

const s3File = fs.readFileSync(path.resolve(__dirname, 's3.json'), 'utf8');
const keys = JSON.parse(s3File);
const s3 = new S3(keys);

router.get('/', function (req, res, next) {
  const {
    query: { name, type },
  } = req;
  const [, fileExtension] = type.split('/');
  const key = `${uuid()}.${fileExtension}`;
  const params = {
    Bucket: 'files.dev.gamelearn.io',
    Key: key,
    ContentType: type,
  };
  s3.getSignedUrlPromise('putObject', params)
    .then(function (url) {
      console.log(url);
      res.json({ key, url });
    })
    .catch(function (err) {
      console.error(err);
      res.status(400).send();
    });
});

router.post('/:key', function (req, res, next) {
  const {
    params: { key },
  } = req;
  res.json({ key });
});

module.exports = router;
