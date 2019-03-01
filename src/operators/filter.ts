import { Observable, Observer } from 'rxjs';

export const myFilter = <T>(filterFn: (n: T) => boolean) =>
    (source: Observable<T>) => {
        return new Observable((observer: Observer<T>) => {
            const subscription = source.subscribe(
                (next: T) => {
                    if(filterFn(next)) {
                        observer.next(next);
                    }
                },
                (err: any) => observer.error(err),
                () => observer.complete()
            );

            return subscription;
        });
    };

