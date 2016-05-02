import superagent from 'superagent';
import * as async from 'async';

const checkAvailability = (values) => {
  return new Promise((resolve, reject) => {
    async.parallel(
      {
        username: (cb)=> values.username ? superagent.get(`/api/v1/author/${values.username}/available`).end(cb) : cb(null),
        portalName: (cb)=> values.portalName ? superagent.get(`/api/v1/portal/${values.portalName}/available`).end(cb) : cb(null)
      },
      (err, { body } = {})=> err ? reject(body || err) : resolve(err)
    );
  });
};

const asyncValidate = (values) => {
  return checkAvailability(values)
    .catch((err)=> {
      throw err; // eslint-disable-line no-throw-literal
    });
};

export default asyncValidate;
