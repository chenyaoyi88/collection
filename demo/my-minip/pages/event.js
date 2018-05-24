const events = {};

export function eventBusOn(name, self, callback) {
    const tuple = [self, callback];
    const callbacks = events[name];
    if (Array.isArray(callbacks)) {
        callbacks.push(tuple);
    }
    else {
        events[name] = [tuple];
    }
}

export function eventBusRemove(name, self) {
    const callbacks = events[name];
    if (Array.isArray(callbacks)) {
        events[name] = callbacks.filter((tuple) => {
            return tuple[0] != self;
        })
    }
}

export function eventBusEmit(name, data) {
    const callbacks = events[name];
    if (Array.isArray(callbacks)) {
        callbacks.map((tuple) => {
            const self = tuple[0];
            const callback = tuple[1];
            callback.call(self, data);
        })
    }
}

