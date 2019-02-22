import { of } from 'rxjs';
import { myMap } from './map';
import { map } from 'rxjs/operators';

test('create our own map operator', (done) => {
    let expectedResult = [2, 4, 6, 8, 10];

    of(1, 2, 3, 4, 5).pipe(
        myMap((x: number) => x * 2)
    ).subscribe(val => {
        const expected = expectedResult.shift();
        expect(val).toBe(expected);
        if (expectedResult.length === 0) {
            done();
        }
    });
});