import { of, fromEvent, animationFrameScheduler } from 'rxjs';
import { filter, map, switchMap, throttleTime } from 'rxjs/operators';

// import { buildLoggers } from '../utils/log';
// const { log } = buildLoggers('Scroll');

class Scroll {
  observable$;

  constructor() {
    this.observable$ = of(typeof window === 'undefined').pipe(
      filter((bool) => !bool), // checking if window is available or not
      switchMap(() => fromEvent(window, 'scroll', { passive: true })),
      throttleTime(300, animationFrameScheduler),
      map(() => {
        const { scrollX, scrollY } = window;
        return { scrollX, scrollY };
      }),
    );
  }
}

// create a single instance
export default new Scroll();
