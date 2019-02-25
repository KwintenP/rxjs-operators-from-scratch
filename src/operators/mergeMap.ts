import { Observable, Observer, Subscription } from 'rxjs';

export const myMergeMap = <T>(project: (n: T) => Observable<any>) =>
    (source: Observable<T>) =>
        new Observable((observer: Observer<T>) => {
            const subscription = new Subscription();
            subscription.add(source.subscribe(
                (next: T) => {
                    subscription.add(
                        project(next).subscribe(
                            (next: T) => observer.next(next),
                            (err: any) => console.log(err),
                        )
                    );
                },
                (err: any) => observer.error(err),
                () => observer.complete(),
                )
            );

            return subscription;
        });