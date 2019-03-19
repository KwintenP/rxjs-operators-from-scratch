import { Observable, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';

const myOperator = <T>(identifier: string) => (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        const subscription = source.subscribe(
            (next: T) => {
                console.log('next', next);
                console.log('identifier', identifier);
                observer.next(next);
            },
            (error: any) => {
                console.log('erorr', error);
                observer.error(error);
            },
            () => {
                console.log('complete');
                observer.complete();
            }
        );

        return subscription;
    });
};

of(1).pipe(
    myOperator('someString'),
).subscribe((next: number) => console.log(next));
