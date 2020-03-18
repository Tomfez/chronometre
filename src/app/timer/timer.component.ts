import { Component, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnDestroy {
  counter: number;
  timerRef;
  running = false;
  startText = 'Start';
  dragPosition = {x: 0, y: 0};

  startTimer() {
    this.running = !this.running;

    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);

      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

}
