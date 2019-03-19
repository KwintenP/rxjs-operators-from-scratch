import { Observable, Observer } from 'rxjs';

export const myTake = <T>(quantity: number) => (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        let count = 0;
        const subscription = source.subscribe(
            (next: T) => {
                observer.next(next);
                count++;
                if(quantity === count) {
                    observer.complete();
                    subscription.unsubscribe();
                }
            },
            (err: any) => {
                observer.error(err);
            },
            () => {
                observer.complete();
            }
        );

        return subscription;
    });
};



