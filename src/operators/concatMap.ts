import { Observable, Observer, Subscription } from 'rxjs';

export const myConcatMap = <T>(project: (n: T) => Observable<any>) =>
    (source: Observable<T>) =>
        new Observable((observer: Observer<T>) => {
            let queue: Array<Observable<any>> = [];
            let isSubscriptionActive = false;
            const subscription = new Subscription();
            subscription.add(
                source.subscribe(
                    (next: T) => {
                        const subscribeToObs = (obs: Observable<T>) => {
                            subscription.add(
                                obs.subscribe(
                                    (next: T) => observer.next(next),
                                    (err: any) => {
                                        observer.error(err);
                                    },
                                    () => {
                                        const [first, ...rest] = queue;
                                        if (first) {
                                            queue = rest;
                                            subscribeToObs(first);
                                        } else {
                                            isSubscriptionActive = false;
                                        }
                                    }
                                )
                            );
                        };

                        const inner$ = project(next);
                        if (isSubscriptionActive) {
                            queue.push(inner$);
                        } else {
                            isSubscriptionActive = true;
                            subscribeToObs(inner$);
                        }
                    },
                    (err: any) => observer.error(err),
                    () => observer.complete(),
                )
            );

            return subscription;
        });