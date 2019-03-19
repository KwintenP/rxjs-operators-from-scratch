import { Observable, Observer } from 'rxjs';

export const myOf = <T>(...values: Array<T>) => {
    return new Observable((observer: Observer<T>) => {
        values.forEach(val => observer.next(val));
        observer.complete();
    });
};