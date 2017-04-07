
import {SEND_LOAD, FAILED_LOAD, SUCCESS_LOAD} from '../contracts/load.contracts';

export default (state = false, action) => {
  switch (action.type) {
    case SEND_LOAD:
      return true;
    case FAILED_LOAD:
      return false;
    case SUCCESS_LOAD:
      return false;
    default:
      return state;
  }
}