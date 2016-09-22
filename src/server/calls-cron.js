import {CronJob} from 'cron';
import request from 'superagent';
import config from 'config';
import async from 'async';
export default new CronJob('*/1 * * * *', () => {
  async.waterfall([
    (callback)=> {
      const path = `${config.apiUrl}/api/v1/call/date/1-1-2016`;
      console.log(path);
      return request
        .get(path)
        .end(callback);
    },
    (calls, callback)=> {
      console.log(calls);
      async.each(calls, (call, cb)=> {
        const path = `${config.mainDomain(true)}/call?phone1=+905383762505&phone2=+905367353631`;
        request.get(path).end(cb);
      }, callback);
    }
  ], (err)=> {
    console.log(err.status);
    console.log(err.response.text);
  });
});
