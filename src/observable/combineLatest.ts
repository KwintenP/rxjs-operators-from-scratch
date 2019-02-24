import { Observable, Observer } from 'rxjs';

const NONE = {};

export const myCombineLatest = (...observables: Array<Observable<any>>) => {
    return new Observable((observer: Observer<Array<any>>) => {
        let values = Array.from({length: observables.length}).map(_ => NONE);
        let toRespond = observables.length;
        const nrOfObservables = observables.length;
        let nrOfCompletedObservables = 0;
        const subscriptions = observables.map((obs, i) => {
            return obs.subscribe(
                (next: any) => {
                    // has every $ emitted a value
                    // keep a reference to the next event for future reference
                    if (values[i] === NONE) {
                        toRespond--;
                    }
                    values[i] = next;
                    if (toRespond === 0) {
                        observer.next(values);
                    }
                },
                (err: any) => observer.error(err),
                () => {
                    if(nrOfObservables === ++nrOfCompletedObservables) {
                        observer.complete();
                    }
                },
            );
        });
        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        }
    });
};