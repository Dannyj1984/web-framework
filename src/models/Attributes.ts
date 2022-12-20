export class Attributes<T> {
  constructor(private data: T){}

  //type of K can only be the type of the different keys of T
  //setting function as arrow method binds this to Attributes class, so can access this.data.
  get = <K extends keyof T>(key: K): T[K] => { //return the type of the key in T
    return this.data[key]
  }

  getAll(): T {
    return this.data;
  }

  set(update: T): void {
    Object.assign(this.data, update)
  }
}