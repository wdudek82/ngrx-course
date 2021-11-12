import { createAction, props } from '@ngrx/store';
import { Course } from './model/course';
import { Update } from '@ngrx/entity';

export enum CourseActionTypes {
  LoadCourses = '[Course] Load Courses',
  CoursesLoaded = '[Load Courses Effect] Courses Loaded',
  CourseUpdated = '[Edit Course Dialog] Course Updated',
}

export const loadAllCourses = createAction(CourseActionTypes.LoadCourses);

export const allCoursesLoaded = createAction(
  CourseActionTypes.CoursesLoaded,
  props<{ courses: Course[] }>(),
);

export const courseUpdated = createAction(
  CourseActionTypes.CourseUpdated,
  props<{ update: Update<Course> }>(),
);

export const CourseActions = { loadAllCourses, allCoursesLoaded, courseUpdated };
