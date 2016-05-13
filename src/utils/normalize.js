import { normalize, Schema, arrayOf } from 'normalizr';
import * as _ from 'lodash';

export function courses(arrayOfCourses) {
  const coursesSchema = new Schema('courses', { idAttribute: 'slug' });
  const results = normalize({ courses: arrayOfCourses }, {
    courses: arrayOf(coursesSchema)
  });
  const entities = _.get(results, 'entities.courses', {});
  const order = _.get(results, 'result.courses', []);
  return { order, entities };
}
