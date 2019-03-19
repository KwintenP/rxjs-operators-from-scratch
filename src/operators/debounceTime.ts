import { Observable, Observer } from 'rxjs';

export const myDebounceTime = <T>(debounce: number) => (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        let timeoutId: number | undefined;
        let sourceCompleted = false;
        const subscription = source.subscribe(
            (next: T) => {
                if(timeoutId) {
                    clearTimeout(timeoutId);
                }

                timeoutId = setTimeout(() => {
                    observer.next(next);
                    timeoutId = undefined;
                    if(sourceCompleted) {
                        observer.complete();
                    }
                }, debounce);
            },
            (err: any) => observer.error(err),
            () => {
                sourceCompleted = true;
                if(!timeoutId) {
                    observer.complete();
                }
            }
        );

        return subscription;
    });
};



