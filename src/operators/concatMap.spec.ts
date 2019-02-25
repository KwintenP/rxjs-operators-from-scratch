import { Observable, Observer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { myConcatMap } from './concatMap';

test('create our own concatMap operator', (done) => {
    let expectedResult = [1, 1, 1, 2, 2, 2];

    const getObs = (index: number) => {
        return new Observable((observer: Observer<T>) => {
            observer.next(index);
            setTimeout(() => observer.next(index), 20);
            setTimeout(() => observer.next(index), 40);
            setTimeout(() => observer.complete(), 50);
        });
    };

    new Observable((observer: Observer<T>) => {
        observer.next(1);
        setTimeout(() => observer.next(2), 30);
        setTimeout(() => observer.complete(), 50);
    }).pipe(
        myConcatMap((val: number) => getObs(val))
    ).subscribe(val => {
            console.log(val);
            const expected = expectedResult.shift();
            expect(val).toBe(expected)
        },
        (err: any) => {
        },
        () => done()
    );
});