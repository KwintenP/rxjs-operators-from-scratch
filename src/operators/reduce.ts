import { Observable, Observer } from 'rxjs';

export const myReduce = <T, E>(accumulator: (acc: E, cur: T) => E, seed: E) =>
    (source: Observable<T>) => {
        return new Observable((observer: Observer<E>) => {
           let acc = seed;
           source.subscribe(
               (next: T) => {
                   acc = accumulator(acc, next);
               },
               (err: any) => observer.error(err),
               () => {
                   observer.next(acc);
                   observer.complete();
               },
           )
        });
    };

// 0, 1 -> 1
// 1, 2 -> 3
// 3, 3 -> 6
