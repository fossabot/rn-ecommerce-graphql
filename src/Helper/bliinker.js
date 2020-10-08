import { interval } from 'rxjs';
import { scan } from 'rxjs/operators';

export const blinker = (callback, maximum) => {
  const MAX_NUM = maximum || 300;
  interval(2000)
    .pipe(scan((acc, value) => (acc + value) % MAX_NUM, 0))
    .subscribe((x) => callback(x));
};
