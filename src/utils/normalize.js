import { normalize, Schema, arrayOf } from 'normalizr';
import get from 'lodash/get';

export function courses(arrayOfCourses) {
  const coursesSchema = new Schema('courses', { idAttribute: 'slug' });
  const results = normalize({ courses: arrayOfCourses }, {
    courses: arrayOf(coursesSchema)
  });
  const entities = get(results, 'entities.courses', {});
  const order = get(results, 'result.courses', []);
  return { order, entities, listLoaded: true };
}

export function normalizeBySlug(arrayOfObjects) {
  const schema = new Schema('objects', { idAttribute: 'slug' });
  const results = normalize(
    {
      objects: arrayOfObjects
    },
    {
      objects: arrayOf(schema)
    });
  const entities = get(results, 'entities.objects', {});
  const order = get(results, 'result.objects', []);
  return { order, entities, listLoaded: true };
}

export function normalizeBy(arrayOfObjects, idAttribute) {
  const schema = new Schema('objects', { idAttribute });
  const results = normalize(
    {
      objects: arrayOfObjects
    },
    {
      objects: arrayOf(schema)
    });
  const entities = get(results, 'entities.objects', {});
  const order = get(results, 'result.objects', []);
  return { order, entities, listLoaded: true };
}

export function lessons(arrayOfLessons) {
  const lessonsSchema = new Schema('lessons', { idAttribute: 'slug' });
  const lessonsWithPages = arrayOfLessons.map(lesson=> ({ ...lesson, pages: normalizeBySlug(lesson.pages) }));
  const results = normalize({ lessons: lessonsWithPages }, {
    lessons: arrayOf(lessonsSchema)
  });
  const entities = get(results, 'entities.lessons', {});
  const order = get(results, 'result.lessons', []);
  return { order, entities, listLoaded: true };
}


export function categories(arrayOfCategories) {
  const categoriesSchema = new Schema('categories', { idAttribute: 'slug' });
  const results = normalize({ categories: arrayOfCategories }, {
    categories: arrayOf(categoriesSchema)
  });
  const entities = get(results, 'entities.categories', {});
  const order = get(results, 'result.categories', []);
  return { order, entities, listLoaded: true };
}
