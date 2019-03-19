import { merge, Observable, Observer, of } from 'rxjs';
import { myMerge } from './merge';
import { myOf } from './of';

test('create our own of operator', (done) => {
    const expectedResult = [1, 2, 3, 4, 5];

    myOf(1, 2, 3, 4, 5)
        .subscribe(val => {
                const expected = expectedResult.shift();
                expect(val).toBe(expected);
            },
            (err: any) => console.log,
            () => {
                expect(expectedResult.length).toBe(0);
                done();
            }
        );
});