import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private courseEntityService: CourseEntityService,
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.courseEntityService.entities$.pipe(
      map((courses) => {
        return courses.filter((c) => c.category === 'BEGINNER');
      }),
    );
    this.advancedCourses$ = this.courseEntityService.entities$.pipe(
      map((courses) => {
        return courses.filter((c) => c.category === 'ADVANCED');
      }),
    );
    this.promoTotal$ = this.courseEntityService.entities$.pipe(
      map((courses) => {
        return courses.filter((c) => !!c.promo).length;
      }),
    );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create',
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
