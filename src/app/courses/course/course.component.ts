import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { LessonEntityService } from '../services/lesson-entity.service';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;
  loading$: Observable<boolean>;
  lessons$: Observable<Lesson[]>;
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  constructor(
    private route: ActivatedRoute,
    private courseEntityService: CourseEntityService,
    private lessonEntityService: LessonEntityService,
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    this.course$ = this.courseEntityService.entities$.pipe(
      map((courses) => courses.filter((c) => c.url === courseUrl)[0]),
    );

    this.lessons$ = this.lessonEntityService.entities$.pipe(
      withLatestFrom(this.course$),
      tap(([lessons, course]) => {
        if (this.nextPage === 0) {
          this.loadLessonsPage(course);
        }
      }),
      map(([lessons, course]) =>
        lessons.filter((l) => l.courseId === course.id),
      ),
    );

    this.loading$ = this.lessonEntityService.loading$.pipe(
      delay(0),
    );
  }

  loadLessonsPage(course: Course) {
    this.lessonEntityService.getWithQuery({
      courseId: course.id.toString(),
      pageNumber: this.nextPage.toString(),
      pageSize: '3',
    });
    this.nextPage += 1;
  }
}
