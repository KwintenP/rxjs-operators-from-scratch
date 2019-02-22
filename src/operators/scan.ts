import { Observable, Observer } from 'rxjs';

export const myScan = <T, E>(accumulator: (acc: E, cur: T) => E, seed: E) =>
    (source: Observable<T>) => {
        return new Observable((observer: Observer<E>) => {
           let acc = seed;
           source.subscribe(
               (next: T) => {
                   acc = accumulator(acc, next);
                   observer.next(acc);
               }
           )
        });
    };

// 0, 1 -> 1
// 1, 2 -> 3
// 3, 3 -> 6
