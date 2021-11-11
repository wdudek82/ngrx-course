import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { finalize, first, tap } from 'rxjs/operators';
import { loadAllCourses } from './course.actions';

@Injectable({
  providedIn: 'root',
})
export class CoursesResolver implements Resolve<AppState> {
  private loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<AppState> {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      first(),
      finalize(() => {
        this.loading = false;
      }),
    );
  }
}
