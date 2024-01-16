const request = require('request');

const REQUEST_URL = 'http://letsrevolutionizetesting.com/challenge.json';

function requestPromise(url) {
  return new Promise((resolve, reject) => {
    request.get(url, {json: true}, (error, response, body) => {
      if(error) {
        reject(error);
      }else {
        resolve(body);
      }
    });
  });
}

function loopPromise(url = REQUEST_URL) {
  return requestPromise(url).then((challenge) => {
    if (Object.prototype.hasOwnProperty.call(challenge, 'follow')) {
      return loopPromise(challenge.follow.replace('challenge?', 'challenge.json?'));
    }
    return challenge;
  });
}

loopPromise().then((result) => {
  console.log('end of loops', result);
  process.exit(0);
})
.catch((err) => {
  console.error('error', err);
  process.exit(0);
});