
import {SEND_LOAD, FAILED_LOAD, SUCCESS_LOAD} from '../contracts/load.contracts';

export const send = () => ({
  type: SEND_LOAD
});

export const success = () => ({
  type: SUCCESS_LOAD
});

export const failed = () => ({
  type: FAILED_LOAD
});