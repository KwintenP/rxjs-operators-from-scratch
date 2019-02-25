import { timer } from 'rxjs';
import { myTimer } from './timer';

test('create our own of operator', (done) => {
    const expectedResult = [0, 1, 2, 3, 4, 5];

    myTimer(0, 10)
        .subscribe(val => {
            const expected = expectedResult.shift();
            expect(val).toBe(expected);
            if (expectedResult.length === 0) {
                done();
            }
        })
});