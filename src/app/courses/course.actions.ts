import { Action, createAction, props } from '@ngrx/store';
import { Course } from './model/course';

export enum CourseActionTypes {
  LoadCourses = '[Course] Load Courses',
  CoursesLoaded = '[Load Courses Effect] Courses Loaded',
}

export const loadAllCourses = createAction(
  CourseActionTypes.LoadCourses,
);

export const allCoursesLoaded = createAction(
  CourseActionTypes.CoursesLoaded,
  props<{courses: Course[]}>()
);

export const CourseActions = {loadAllCourses, allCoursesLoaded};
