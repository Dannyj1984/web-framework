import { User } from "./models/User";
import { UserForm } from "./views/UserForm";
import { UserShow } from "./views/UserShow";

const rootDiv = document.getElementById('root')

const user = User.buildUser({name: 'Danny', age: 20})

if(rootDiv){
  const userForm = new UserForm(rootDiv, user);
  userForm.render();
} else {
  throw new Error('Root element not found');
}








