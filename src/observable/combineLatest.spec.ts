import { combineLatest, Observable, Observer } from 'rxjs';
import { myCombineLatest } from './combineLatest';

test('create our own combineLatest operator', (done) => {
    const obs1 = new Observable((observer: Observer<T>) => {
        observer.next(1);
        setTimeout(() => observer.next(2), 10);
        setTimeout(() => observer.next(3), 30);
        setTimeout(() => observer.complete(), 50);
    });

    const obs2 = new Observable((observer: Observer<T>) => {
        observer.next('a');
        setTimeout(() => observer.next('b'), 20);
        setTimeout(() => observer.next('c'), 40);
        setTimeout(() => observer.complete(), 50);
    });

    let expectedResult = [
        [1, 'a'],
        [2, 'a'],
        [2, 'b'],
        [3, 'b'],
        [3, 'c']
    ];

    myCombineLatest(obs1, obs2)
        .subscribe(val => {
                const expected = expectedResult.shift();
                expect(val).toEqual(expected);
            },
            (err: any) => console.log,
            () => done()
        );
});