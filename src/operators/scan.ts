import { Observable, Observer } from 'rxjs';

export const myScan = <T>(accumulator: (acc: mqkjdf)) => (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        source.subscribe(
            (next: T) => {},
            (err: any) => {},
            () => {}
        );
    });
};

