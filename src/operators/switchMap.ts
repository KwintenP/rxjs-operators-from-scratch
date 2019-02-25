import { Observable, Observer, Subscription } from 'rxjs';

export const mySwitchMap = (project: (n: T) => Observable<any>) =>
    (source: Observable<T>) =>
        new Observable((observer: Observer<T>) => {
            let innerSubscription: Subscription;
            const subscription = source.subscribe(
                (next: T) => {
                    innerSubscription && innerSubscription.unsubscribe();
                    const inner$ = project(next);
                    innerSubscription = inner$.subscribe(
                        (next: T) => observer.next(next),
                        (err: any) => observer.error(err),
                    );
                },
                (err: any) => observer.error(err),
                () => observer.complete(),
            );

            return subscription;
        });