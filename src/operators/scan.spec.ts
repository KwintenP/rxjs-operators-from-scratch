import { of } from 'rxjs';
import { scan } from 'rxjs/operators';
import { myScan } from './scan';

test('create our own filter operator', (done) => {
    let expectedResult = [1, 3, 6, 10, 15];

    of(1, 2, 3, 4, 5).pipe(
        myScan((acc, cur) => acc + cur, 0)
    ).subscribe(val => {
        const expected = expectedResult.shift();
        expect(val).toBe(expected);
        if (expectedResult.length === 0) {
            done();
        }
    });
});