import { Observable, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';

const newOperator = <T>(identifier: string) => (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        const subscription = source.subscribe(
            (next: T) => {
                console.log('next', next);
                console.log('identifier', identifier);
                observer.next(next);
            },
            (error: any) => {
                console.log('error', error);
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
    newOperator('someIdentifier')
).subscribe(val => console.log('this is the next value', val));
