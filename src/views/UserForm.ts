import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User,UserProps> {
  

  eventsMap(): {[key: string]: () => void} {
    return {
      'click:#set-age': this.onSetAgeClick, //using .set-age will look for class .set-age in the bind events method
      'click:#set-name': this.onSetNameClick, 
      'click:#save-model': this.onSaveModelClick
    }
  }

  onSetAgeClick = (): void => { //arrow function allows this to refer to the model  
    this.model.setRandomAge();
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    
    if(input) {
      const name = input.value;
      this.model.set({name})
    } 
  };

  onSaveModelClick = (): void => {
    this.model.save()
  };

  template(): string {
    return `
      <div>
        <input placeholder=${this.model.get('name')} />
        <button id='set-name'>Update name</button>
        <button id='set-age'>Set random age</button>
        <button id='save-model'>Save user</button>
      </div>
    `;
  }
}