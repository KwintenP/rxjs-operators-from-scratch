import { Observable, Observer } from 'rxjs';

export const myMerge = (...observables: Array<Observable<any>>) => {
    return new Observable((observer: Observer<any>) => {
        const nrOfObservables = observables.length;
        let nrOfObservablesCompleted = 0;
        const subscriptions = observables.map(obs => obs.subscribe(
            (next: any) => {
                observer.next(next);
            },
            (err: any) => {
                observer.error(err);
            },
            () => {
                nrOfObservablesCompleted++;
                if(nrOfObservables === nrOfObservablesCompleted) {
                    // if ALL of the source observables completed
                    observer.complete();
                }
            }
        ));

        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        }
    });
};