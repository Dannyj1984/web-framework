import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserProps> {

  template(): string {
    return `
      <div>
        <h1>User info</h1>
        <h4>Name: ${this.model.get('name')}</h4>
        <h4>Age: ${this.model.get('age')}</h4>
      </div>
    `;
  }

}