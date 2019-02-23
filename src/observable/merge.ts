import { Observable, Observer, Subscription } from 'rxjs';

export const myMerge = (...observables: Array<Observable<T>>) => {
    const nrOfObservables = observables.length;
    let nrOfObservablesCompleted = 0;
    return new Observable((observer: Observer<T>) => {
        const subscriptions = observables.map(obs => {
            return obs.subscribe(
                (next) => observer.next(next),
                (err: any) => observer.error(err),
                () => {
                    if (nrOfObservables === ++nrOfObservablesCompleted) {
                        observer.complete();
                    }
                },
            )
        });

        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        };
    });
};