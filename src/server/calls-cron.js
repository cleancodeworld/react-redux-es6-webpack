import {CronJob} from 'cron';
import request from 'superagent';
import config from 'config';
import async from 'async';
import moment from 'moment';

export default new CronJob('*/1 * * * *', () => {
  async.waterfall([
    (callback)=> {
      const path = `${config.apiUrl}/api/v1/call/date/${moment().set('second', 0).toISOString()}/${moment().set('second', 60).toISOString()}`;
      // const path = `${config.apiUrl}/api/v1/call/date/2016-09-19T21:20:00Z/2016-09-19T21:40:00Z`
      console.log(path);
      return request
        .get(path)
        .end(callback);
    },
    ({body}, callback)=> {
      console.log(res.body);
      async.each(body.data.calls, (call, cb)=> {
        const path = `${config.mainDomain(true)}/call?phone1=${call.expert.phone}&phone2=${call.requester.phone}`;
        request.get(path).end(cb);
      }, callback);
    }
  ], (err)=> {
    if (err) {
      console.log(err.status);
      console.log(err.response.text);
    }
  });
});
