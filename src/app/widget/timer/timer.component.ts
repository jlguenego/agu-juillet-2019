import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Observer, interval, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { startWith, scan, take } from 'rxjs/operators';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input() init = 60;

  @Output() timerTimeout = new EventEmitter<string>(false);

  obs: Observable<number>;
  obs2: Observable<number>;
  subject: Subject<number>;

  subscription: Subscription;

  constructor() {

  }

  ngOnInit() {
    this.obs = new Observable<number>((observer: Observer<number>) => {
       (async () => {
        let count = this.init;
        observer.next(count);
        while (count > 0) {
          await sleep(1000);
          count--;
          observer.next(count);
        }
        observer.complete();

      })();
    });

    this.obs2 = interval(1000).pipe(
      startWith(0),
      scan(acc => {
        console.log('obs', acc - 1);
        return acc - 1;
      }, this.init + 1),
      take(this.init + 1)
    );

    this.subject = new BehaviorSubject<number>(this.init);

    this.subscription = this.obs2.subscribe(this.subject);
    this.subject.subscribe({
      complete: () => {
        console.log('complete');
        this.timerTimeout.emit('trop tard...');
      }
    });
  }

  ngOnDestroy(): void {
    // interromp observable
    this.subscription.unsubscribe();
  }

}
