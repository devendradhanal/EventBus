var EventBus = {};

EventBus = function() {
    this.eventListeners = {};
};

EventBus.prototype.add = function(eventName, callbacks) {
    if (Array.isArray(callbacks)) {
        if (typeof this.eventListeners[eventName] != "undefined") {
            for (var i = 0; i < callbacks.length; i++) {
                this.eventListeners[eventName].push(callbacks[i]);
            };
        } else {
        	this.eventListeners[eventName] = [];
        	for (var i = 0; i < callbacks.length; i++) {
                this.eventListeners[eventName].push(callbacks[i]);
            };
        }
    } else {
        this.eventListeners[eventName] = [callbacks];
    }
};

EventBus.prototype.remove = function(eventName, callbacks) {
    var newArray = [];
    if (Array.isArray(callbacks)) {
        for (var i = 0; i < callbacks.length; i++) {
            for (var j = 0; j < callbacks.length; j++) {
                var listener = this.eventListeners[eventName][i];
                if (listener == callbacks[i]) {
                    // do nothing
                } else {
                    newArray.push(listener);
                }
            }
        }
        this.eventListeners[eventName] = newArray;
    } else {
        this.eventListeners[eventName] = newArray;
    }
};


EventBus.prototype.trigger = function(eventName, data) {

    if (typeof data != "undefined") {
        var numOfCallbacks = this.eventListeners[eventName].length;
        for (var i = 0; i < numOfCallbacks; i++) {
            var listener = this.eventListeners[eventName][i];
            if (listener) {
                listener.apply(data);
            }
        }
    } else {
        var numOfCallbacks = this.eventListeners[eventName].length;
        for (var i = 0; i < numOfCallbacks; i++) {
            var listener = this.eventListeners[eventName][i];
            if (listener) {
                listener.call();
            }
        }
    }
};
