import { User, UserProps } from "../models/User";
import { UserList } from "./UserList";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
      'click:.list-users': this.onListUsers,
    };
  }

  onSaveClick = (): void => {
    this.model.save();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;

      this.model.set({ name });
    }
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onListUsers = (): void => {
    const users = User.buildUserCollection()
    users.on('change', () => {
      const root = document.querySelector('.user-list-div');
      if(root){
        root.innerHTML =  '';
      
        new UserList(root, users).render();
      } else {
        throw new Error('Root element not found');
      }
    });
    
    users.fetch();

    const list = document.querySelector('.user-list-div');
    if(list) {
      list.classList.toggle('hide')
    }
  }

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
        <button class="list-users">List Users</button>
      </div>
    `;
  }
}