import { Observable, Observer } from 'rxjs';

export const myInterval = (periodTime: number) =>
    new Observable((observer: Observer<number>) => {
        let counter = -1;
        const clearIntervalId = setInterval(() => observer.next(++counter), periodTime);

        return () => {
            clearInterval(clearIntervalId);
        }
    });