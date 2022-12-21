import { User, UserProps } from "../models/User";
import { View } from "./View";

export class ListUserShow extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.fetch-user': this.onFetchUser
    };
  }

  onFetchUser = (): void => {
      console.log(this.model.get('name'))
  }

//TODO add button to switch user
  template(): string {
    return `
      <div class='user-list'>
        <div>User ID: ${this.model.get('id')}</div>
        <div>User Name: ${this.model.get('name')}</div>
        <div>User Age: ${this.model.get('age')}</div>
        <button class='fetch-user'>Switch</button>
        <hr>
      </div>
    `;
  }
}