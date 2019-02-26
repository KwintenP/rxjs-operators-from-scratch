import { Observable, Observer } from 'rxjs';

export const myFilter = <T>(filter: (n: T) => boolean) =>
    (source: Observable<T>) => {
        return new Observable((observer: Observer<T>) => {
            const subscription = source.subscribe(
                (next: T) => {
                    // call filter function
                    // true -> pass to the observer
                    // false -> discard the event
                    if(filter(next)) {
                        observer.next(next);
                    }
                },
                (err: any) => observer.error(err),
                () => observer.complete(),
            );

            return subscription;
        });
    };
