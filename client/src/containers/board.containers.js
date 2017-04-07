
import React from 'react';
import { connect } from 'react-redux'
import Board from '../components/board.component';
import {load, add, recalculate} from '../actions/points.actions';
import {
  send as sendSave, failed as failedSave, success as successSave
} from '../actions/save.actions';
import {
  send as sendLoad, failed as failedLoad, success as successLoad
} from '../actions/load.actions';
import each from 'async/each';
import './board.css';

export default connect(
  (state) => ({
    load: state.load,
    save: state.save,
    points: state.points
  }),
  (dispatch) => ({
    onLoadClick: () => {
      dispatch(sendLoad());
      fetch('/api/v1/boards')
        .then(body => body.json())
        .then(data => {
          const save = data.points.map(_ => ({
            x: _.x,
            y: _.y,
            opacity: _.opacity
          }));
          dispatch(load(save));
          dispatch(successLoad());
        })
        .catch(err => dispatch(failedLoad()));
    },
    onSaveClick: (points) => {
      dispatch(sendSave());
      let session = null;
      fetch('/api/v1/sessions', {method: 'POST'})
        .then(body => body.json())
        .then((data) => new Promise((resolve, reject) => {
          session = data.id;
          each(
            points,
            (point, cb) => {
              fetch(`/api/v1/points`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  x: point.x,
                  y: point.y,
                  opacity: point.opacity,
                  session: session
                })
              })
                .then(() => cb())
                .catch(err => cb(err));
            }, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        }))
        .then(() => fetch(`/api/v1/boards/complete/${session}`, {method: 'POST'}))
        .then(() => dispatch(successSave()))
        .catch(() => dispatch(failedSave()))
    },
    onCellClick: (x, y) => {
      dispatch(add({x, y, opacity: 100}));
    },
    onRecalculate: (points) => {
      dispatch(recalculate(points));
    }
  })
)((props) => (
  <Board
    load={props.load}
    save={props.save}
    points={props.points}
    onCellClick={props.onCellClick}
    onRecalculate={props.onRecalculate}
    onLoadClick={props.onLoadClick}
    onSaveClick={props.onSaveClick}
  />
));