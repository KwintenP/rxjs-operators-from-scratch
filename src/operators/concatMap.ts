import { Observable, Observer, Subscription } from 'rxjs';

export const myConcatMap = <T>(project: (n: T) => Observable<any>) => (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        let innerSubActive = false;
        let outerSubActive = true;
        const queue: Array<Observable<any>> = [];
        const subscription = new Subscription();
        subscription.add(source.subscribe(
            (next: T) => {
                const subscribeToInner = (inner$: Observable<any>) => {
                    subscription.add(inner$.subscribe(
                        (next: any) => observer.next(next),
                        (err: any) => observer.error(err),
                        () => {
                            const first$ = queue.shift();
                            if(first$) {
                                subscribeToInner(first$);
                            } else {
                                innerSubActive = false;
                                if(!outerSubActive) {
                                    observer.complete();
                                }
                            }
                        }
                    ));
                };

                const inner$ = project(next);

                if(!innerSubActive) {
                    innerSubActive = true;
                    subscribeToInner(inner$);
                } else {
                    queue.push(inner$);
                }
            },
            (err: any) => observer.error(err),
            () => {
                outerSubActive = false;
                if(!innerSubActive) {
                    observer.complete();
                }
            }
        ));

        return subscription;
    });
};

