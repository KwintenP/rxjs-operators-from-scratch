import { Observable, Observer } from 'rxjs';
import { myConcatMap } from './concatMap';
import { concatMap } from 'rxjs/operators';

test('create our own concatMap operator', (done) => {
    let expectedResult = [1, 1, 1, 2, 2, 2];

    const getObs = (index: number) => {
        return new Observable((observer: Observer<number>) => {
            observer.next(index);
            setTimeout(() => observer.next(index), 20);
            setTimeout(() => observer.next(index), 40);
            setTimeout(() => observer.complete(), 50);
        });
    };

    new Observable((observer: Observer<number>) => {
        observer.next(1);
        setTimeout(() => observer.next(2), 30);
        setTimeout(() => observer.complete(), 50);
    }).pipe(
        myConcatMap((val: number) => getObs(val))
    ).subscribe(val => {
            const expected = expectedResult.shift();
            expect(expected).toBe(val);
        },
        (err: any) => {
        },
        () => {
            expect(expectedResult.length).toBe(0);
            done();
        }
    );
});

// <editor-fold desc="marble">
// geObs     v--v--v-|
// source$:  x----x----
//           |        \
//           \         2--2--2-|
//            1--1--1-|
// result$   -1--1--1--2--2--2-|
// </editor-fold>