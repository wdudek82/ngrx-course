import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { CourseActions } from './course.actions';
import { CoursesHttpService } from './services/courses-http.service';
import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap((action) => this.coursesHttpService.findAllCourses()),
      map((courses) => CourseActions.allCoursesLoaded({ courses })),
    ),
  );
  saveCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap((action) => {
          return this.coursesHttpService.saveCourse(
            action.update.id,
            action.update.changes,
          );
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService,
  ) {}
}
