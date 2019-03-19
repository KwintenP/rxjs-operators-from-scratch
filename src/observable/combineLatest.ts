import { Observable, Observer } from 'rxjs';

const NONE = {};

export const myCombineLatest = (...observables: Array<Observable<any>>) => {
    return new Observable((observer: Observer<Array<any>>) => {
        let values = Array.from({length: observables.length}).map(_ => NONE);
        let toRespond = observables.length;
        const nrOfObservables = observables.length;
        let nrOfObservablesCompleted = 0;
        const subscriptions = observables.map((obs, i) => obs.subscribe(
            (next: any) => {
                // keep a reference to the last next of every observable
                // have all of the observables emitted a value
                if(values[i] === NONE) {
                    // first next event for this source observable
                    toRespond--;
                }
                values[i] = next;
                if(toRespond === 0) {
                    // if all of the observables have emitted a value
                    observer.next(values);
                }
            },
            (err: any) => {
                observer.error(err);
            },
            () => {
                // if ALL of the source observables completed
                nrOfObservablesCompleted++;
                if(nrOfObservables === nrOfObservablesCompleted) {
                    observer.complete();
                }
            }
        ));

        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        }
    });
};

// [NONE,NONE]
