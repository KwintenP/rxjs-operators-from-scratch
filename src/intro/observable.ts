interface Observer<T> {
    next: (val: T) => void,
    error: (err: any) => void,
    complete: () => void,
}

class Observable<T> {
    constructor(private producer: (observer: Observer<T>) => void) {

    }

    subscribe(observer: Observer<T>) {
        return this.producer(observer);
    }
}

const nr1Obs = new Observable((observer: Observer<number>) => {
    observer.next(1);
    observer.complete();
});

nr1Obs.subscribe({
    next: val => console.log(val),
    error: err => console.log(err),
    complete: () => console.log('complete')
});

