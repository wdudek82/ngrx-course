import { createReducer, on } from '@ngrx/store';
import { compareCourses, Course } from '../model/course';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CourseActions } from '../course.actions';

export interface CoursesState extends EntityState<Course> {}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCoursesState: CoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) => {
    return adapter.addAll(action.courses, state);
  }),
);

export const { selectAll } = adapter.getSelectors();
