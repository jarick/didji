
import load from './load.reducer';
import points from './points.reducer';
import save from './save.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  load, points, save
});