import { Observable, Observer } from 'rxjs';

export const myScan = <T>(accumulator: (acc: T, cur: T) => T, seed: T) =>
    (source: Observable<T>) => {
        return new Observable((observer: Observer<T>) => {
            let acc = seed;
            const subscription = source.subscribe(
                (next: T) => {
                    acc = accumulator(acc, next);
                    observer.next(acc);
                },
                (err: any) => observer.error(err),
                () => observer.complete(),
            );

            return subscription;
        });
    };

// 0, 1 -> 1
// 1, 2 -> 3
// 3, 3 -> 6
// ....

