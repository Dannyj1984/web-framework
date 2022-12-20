export type Callback = () => void;


export class Eventing {
  events: { [key: string]: Callback[] } = {}
  
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    //check if handlers exists and is an array
    if(!handlers || handlers.length === 0) return;

    handlers.forEach(callback => {
      callback();
    });
  }
}