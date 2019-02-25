import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { myTap } from './tap';

test('create our own map operator', (done) => {
    let expectedResult = [1, 2, 3, 4, 5];

    of(1, 2, 3, 4, 5).pipe(
        myTap(val => {
                const expected = expectedResult.shift();
                expect(val).toBe(expected);
                if (expectedResult.length === 0) {
                    done();
                }
            }
        )
    ).subscribe();
});