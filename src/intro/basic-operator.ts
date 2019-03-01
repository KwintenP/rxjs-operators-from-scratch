import { Observable, Observer, of } from 'rxjs';

const newOperator = <T>(source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        const subsription = source.subscribe(
            (next: T) => {
                console.log('next', next);
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

        return subsription;
    });
};

of(1).pipe(
    newOperator
).subscribe(val => console.log('this is the next value', val));
