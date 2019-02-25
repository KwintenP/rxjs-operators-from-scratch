import { interval } from 'rxjs';
import { myInterval } from './interval';

test('create our own interval', (done) => {
    const expectedResult = [0, 1, 2, 3, 4, 5];

    myInterval(100)
        .subscribe((val: number) => {
            const expected = expectedResult.shift();
            expect(val).toBe(expected);
            if (expectedResult.length === 0) {
                done();
            }
        })
});