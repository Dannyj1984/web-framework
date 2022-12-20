import { AxiosPromise, AxiosResponse } from "axios";
import { Callback } from "./Eventing";

interface ModelAttributes<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export interface HasId {
  id?:number
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ){}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change')
  }

  fetch(): void {
    const id = this.attributes.get('id');
    if(typeof id !== 'number'){
      throw new Error('Cannot fetch without ID');
    }

    this.sync.fetch(id)
    .then((response: AxiosResponse): void => {
      this.set(response.data) //using this.set rather than set method from attributes, will ensure trigger of change
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
    .then((response: AxiosResponse): void =>{
      this.trigger('save')
    })
    .catch(() => {
      this.trigger('error')
    })
  }

}