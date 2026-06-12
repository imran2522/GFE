// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export has the same interface.

export default class EventEmitter {
  constructor() {
    this.events = Object.create(null);
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
    return this;    
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    if (!this.events[eventName]) {
      return this;
    }

    // Remove only one registration (the latest), matching common EventEmitter behavior.
    const listeners = this.events[eventName];
    for (let i = listeners.length - 1; i >= 0; i -= 1) {
      if (listeners[i] === listener) {
        listeners.splice(i, 1);
        break;
      }
    }

    if (listeners.length === 0) {
      delete this.events[eventName];
    }

    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return false;
    }
    this.events[eventName].forEach(listener => listener(...args));
    return true;
  }
}

// Example usage:
const emitter = new EventEmitter();

function listener1(data) {
  console.log('Listener 1 received:', data);
}

function listener2(data) {
  console.log('Listener 2 received:', data);
}

emitter.on('event', listener1).on('event', listener2);
emitter.emit('event', 'Hello, World!'); // Both listeners will be called

emitter.off('event', listener1);
emitter.emit('event', 'Hello again!'); // Only listener2 will be called     