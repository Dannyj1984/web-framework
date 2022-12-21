import { User, UserProps } from "../models/User";
import { CollectionView } from "./CollectionView";
import { ListUserShow } from "./ListUserShow";

export class UserList extends CollectionView<User, UserProps> {
  
  renderItem(model: User, itemParent: Element): void {
    new ListUserShow(itemParent, model).render();
  }
}