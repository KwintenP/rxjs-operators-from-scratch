import { Observable, Observer } from 'rxjs';

export const myOf = <T>(...values: Array<T>) =>
    new Observable((observer: Observer<T>) => {
        values.forEach(value => observer.next(value));
        observer.complete();
    });