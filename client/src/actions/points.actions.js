
import {ADD_POINT, LOAD_POINTS, RECALCULATE_POINTS} from '../contracts/points.contracts';

export const add = (point) => ({
  type: ADD_POINT, point
});

export const load = (points) => ({
  type: LOAD_POINTS, points
});

export const recalculate = (points) => ({
  type: RECALCULATE_POINTS, points
});
