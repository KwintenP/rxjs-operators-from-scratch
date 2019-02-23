import { of } from 'rxjs';
import { reduce } from 'rxjs/operators';
import { myReduce } from './reduce';

test('create our own reduce operator', (done) => {
    let expectedResult = 15;

    of(1, 2, 3, 4, 5).pipe(
        myReduce((acc, cur) => acc + cur, 0)
    ).subscribe(
        {
            next: (val) => expect(val).toBe(expectedResult),
            complete: () => done(),
        },
    );
});