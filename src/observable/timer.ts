import { Observable, Observer } from 'rxjs';

export const myTimer = (timeFirstValue: number, periodTime: number) =>
    new Observable((observer: Observer<number>) => {
        let counter = 0;
        const timeoutId = setTimeout(() => observer.next(counter), timeFirstValue);
        const clearIntervalId = setInterval(() => observer.next(++counter), periodTime);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(clearIntervalId);
        }
    });