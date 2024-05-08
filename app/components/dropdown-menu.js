import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DropdownMenuComponent extends Component {
  @action
  sendDataToParent(event) {
    const selectedValue = event.target.value;
    this.args.onSelect(selectedValue);
  }
}