import { Observable, Observer, Subscription } from 'rxjs';

export const myMergeMap = <T>(project: (n: T) => Observable<any>) =>
    (source: Observable<T>) => {
        return new Observable((observer: Observer<any>) => {
            let active = 0;
            let outerSubCompleted = false;
            const subscription = new Subscription();
            subscription.add(
                source.subscribe(
                    (next: T) => {
                        active++;
                        subscription.add(
                            project(next).subscribe(
                                (next: any) => observer.next(next),
                                (error: any) => observer.error(error),
                                () => {
                                    active--;
                                    if (active === 0 && outerSubCompleted) {
                                        observer.complete();
                                    }
                                }
                            )
                        )
                    },
                    (err: any) => {
                        observer.error(err);
                    },
                    () => {
                        outerSubCompleted = true;
                        if (active === 0) {
                            observer.complete();
                        }
                    }
                ));

            return subscription;
        });
    };
