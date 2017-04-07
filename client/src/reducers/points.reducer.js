
import {ADD_POINT, LOAD_POINTS, RECALCULATE_POINTS} from '../contracts/points.contracts';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_POINT:
      return state
        .filter(point => point.x !== action.point.x || point.y !== action.point.y)
        .concat([action.point]);
    case LOAD_POINTS:
      return action.points;
    case RECALCULATE_POINTS:
      return action.points;
    default:
      return state;
  }
}