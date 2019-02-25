import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { myTake } from './take';

test('create our own take operator', (done) => {
    let expectedResult = [0, 1, 2, 3, 4];

    interval(10).pipe(
        myTake(5)
    ).subscribe(val => {
            const expected = expectedResult.shift();
            expect(val).toBe(expected);
        },
        (err: any) => {
        },
        () => done());
});