import superagent from 'superagent';

const request = url => new Promise((resolve, reject) => superagent.get(url).end((err, { body } = {}) => err ? reject(body || err) : resolve(body)));

const asyncValidate = (values) => {
  return request(`/api/v1/author/${values.username}/available`)
    .then(()=> {
      throw { username: 'That username is taken' }; // eslint-disable-line no-throw-literal
    })
    .catch(err=>err);
};

export default asyncValidate;