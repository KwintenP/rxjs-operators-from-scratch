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
                (err: any) => {
                    observer.error(err);
                },
                () => {
                    observer.complete();
                }
            );

            return subscription;
        });
    };

// acc: 0, cur: 1 => 1
// acc: 1, cur: 2 => 3
// acc: 3, cur: 3 => 6
// ....
