import { timer } from 'rxjs';
import { myTimer } from './timer';

test('create our own timer operator', (done) => {
    const expectedResult = [0, 1, 2, 3, 4, 5];

    myTimer(10, 20)
        .subscribe(val => {
            const expected = expectedResult.shift();
            expect(val).toBe(expected);
            if (expectedResult.length === 0) {
                done();
            }
        })
});