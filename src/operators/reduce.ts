import { Observable, Observer } from 'rxjs';

export const myReduce = <T>(accumulator: (acc: T, cur: T) => T, seed: T) =>
    (source: Observable<T>) => {
        return new Observable((observer: Observer<T>) => {
            let acc = seed;
            const subscription = source.subscribe(
                (next: T) => {
                    acc = accumulator(acc, next);
                },
                (err: any) => observer.error(err),
                () => {
                    observer.next(acc);
                    observer.complete();
                }
            );

            return subscription;
        });
    };

// 0, 1 -> 1
// 1, 2 -> 3
// 3, 3 -> 6
// ....
