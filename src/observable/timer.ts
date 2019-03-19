import { Observable, Observer } from 'rxjs';

export const myTimer = (timeTillFirstValue: number, periodTime: number) => {
    return new Observable((observer: Observer<number>) => {
        let count = 0;
        let intervalId: number;
        const timeoutId = setTimeout(() => {
            observer.next(count);
            count++;
            intervalId = setInterval(() => {
                observer.next(count);
                count++;
            }, periodTime);
        }, timeTillFirstValue);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        }
    });
};