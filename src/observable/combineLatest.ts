import { Observable, Observer } from 'rxjs';

const NONE = {};

export const myCombineLatest = (...observables: Array<Observable<T>>) => {
    return new Observable((observer: Observer<T>) => {
        const nrOfObservables = observables.length;
        let nrOfCompletedObservables = 0;
        let values = Array.from({length: 2}, (() => NONE));
        console.log(NONE);
        let toRespond = observables.length;
        const subscriptions = observables.map((obs, i) => {
            return obs.subscribe(
                (next: T) => {
                    const oldValue = values[i];
                    if (oldValue === NONE) {
                        toRespond--;
                    }
                    values[i] = next;
                    if (toRespond === 0) {
                        observer.next(values);
                    }
                },
                (err: any) => observer.error(err),
                () => {
                    if (nrOfObservables === ++nrOfCompletedObservables) {
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