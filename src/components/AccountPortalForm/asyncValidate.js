import superagent from 'superagent';
import * as async from 'async';

const checkAvailability = (values) => {
  return new Promise((resolve, reject) => {
    async.parallel(
      {
        username: (cb)=> values.username && values.username.length > 3 && values.username.length < 20 ? superagent.get(`/api/v1/author/${values.username}/available`).end((err, {body} = {})=> {
          if (err) cb(err);
          const { available } = body.data;

          if (!available) cb({ username: 'This username is not available' });
          else cb(null);
        }) : cb(null),
        portalName: (cb)=> values.portalName ? superagent.get(`/api/v1/portal/name/${values.portalName}/available`).end((err, {body} = {})=> {
          if (err) cb(err);
          const { available } = body.data;
          if (!available) cb({ portalName: 'This portal name is not available' });
          else cb(null);
        }) : cb(null)
      },
      (err, { body } = {})=> err ? reject(err || body) : resolve(err)
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
