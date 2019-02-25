import { Observable, Observer } from 'rxjs';

export const myMerge = <T>(...observables: Array<Observable<T>>) => {
    return new Observable((observer: Observer<T>) => {
        const nrOfObservables = observables.length;
        let nrOfCompletedObservables = 0;
        const subscriptions = observables.map(obs => {
            return obs.subscribe(
                (next: T) => observer.next(next),
                (err: any) => observer.error(err),
                () => {
                    if(nrOfObservables === ++nrOfCompletedObservables) {
                        observer.complete();
                    }
                },
            );
        });

        return () => {
          subscriptions.forEach(sub => sub.unsubscribe());
        };
    });
};