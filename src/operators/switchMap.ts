import { Observable, Observer, Subscription } from 'rxjs';

export const mySwitchMap = <T>(project: (n: T) => Observable<any>) =>
    (source: Observable<T>) => {
        return new Observable((observer: Observer<any>) => {
            let innerSubscription: Subscription;
            let outerSubscriptionActive = true;
            let innerSubscriptionActive = false;
            const subscription = new Subscription();
            subscription.add(
                source.subscribe(
                    (next: T) => {
                        if (innerSubscription) {
                            innerSubscription.unsubscribe();
                        }
                        innerSubscriptionActive = true;
                        innerSubscription = project(next).subscribe(
                            (next: any) => observer.next(next),
                            (error: any) => observer.error(error),
                            () => {
                                innerSubscriptionActive = false;
                                if (!outerSubscriptionActive) {
                                    observer.complete();
                                }
                            }
                        );
                        subscription.add(innerSubscription);
                    },
                    (err: any) => observer.error(err),
                    () => {
                        outerSubscriptionActive = false;
                        if (!innerSubscriptionActive) {
                            observer.complete();
                        }
                    }
                )
            );

            return subscription;
        });
    };
