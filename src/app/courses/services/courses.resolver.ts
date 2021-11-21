import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CourseEntityService } from './course-entity.service';
import { filter, first, map, tap } from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private courseEntityService: CourseEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.courseEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.courseEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first(),
    );
  }
}
