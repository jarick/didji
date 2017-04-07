
import {FAILED_SAVE, SEND_SAVE, SUCCESS_SAVE} from '../contracts/save.contracts';

export default (state = false, action) => {
  switch(action.type) {
    case SEND_SAVE:
      return true;
    case FAILED_SAVE:
      return false;
    case SUCCESS_SAVE:
      return false;
    default:
      return state;
  }
}