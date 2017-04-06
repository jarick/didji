
const chai = require('chai');
const should = chai.should();
const before = require('./before');
let srv = {};

describe('boards service', () => {
  beforeEach((done) => {
    before((err, data) => {
      srv = data;
      done(err);
    });
  });
  it('#get', (done) => {
    srv.boards.get().then(
      (board) => {
        const mustBy = {
          id: 'board-1',
          name: 'Board-1',
          session: {
            complete: true,
            id: 'session-1'
          },
          points: [
            {
              id: 'point-1',
              opacity: 75,
              session: {
                complete: true,
                id: 'session-1'
              },
              x: 1,
              y: 1
           }
          ]
        };
        try {
          board.should.to.eql(mustBy);
          done();
        } catch(e) {
          done(e);
        }
      },
      (err) => done(err)
    );
  });
  it('#complete', (done) => {
    srv.boards.complete('session-1').then(
      () => done(),
      (err) => done(err)
    );
  })
});