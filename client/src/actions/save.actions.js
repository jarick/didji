
import {FAILED_SAVE, SEND_SAVE, SUCCESS_SAVE} from '../contracts/save.contracts';

export const send = () => ({
  type: SEND_SAVE
});

export const success = () => ({
  type: SUCCESS_SAVE
});

export const failed = () => ({
  type: FAILED_SAVE
});