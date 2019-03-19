import { Observable, Observer } from 'rxjs';

export const myInterval = (intervalTime: number) => {
    return new Observable((observer: Observer<number>) => {
        let count = 0;
        const intervalId = setInterval(() => {
            observer.next(count);
            count++;
        }, intervalTime);

        return () => {
            clearInterval(intervalId);
        };
    });
};