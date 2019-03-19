import { of } from 'rxjs';
import { myTap } from './tap';
import { tap } from 'rxjs/operators';

test('create our own tap operator', (done) => {
    let expectedResult = [1, 2, 3, 4, 5];

    of(1, 2, 3, 4, 5).pipe(
        myTap(
            (next: number) => console.log(next),
            (err: any) => console.log(err),
            () => console.log('complete')
        )
    ).subscribe(
        val => {
            const expected = expectedResult.shift();
            expect(val).toBe(expected);
        },
        (error: any) => {},
        () => {
            expect(expectedResult.length).toBe(0);
            done();
        }
    );
});