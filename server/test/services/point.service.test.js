
const chai = require('chai');
const should = chai.should();
const before = require('./before');
let srv = {};

describe('points service', () => {
  beforeEach((done) => {
    before((err, data) => {
      srv = data;
      done(err);
    });
  });
  it('#create', (done) => {
    srv.points.create(1, 1, 75, 'session-1').then(
      () => done(),
      (err) => done(err)
    );
  });
  it('#fetchBySession', (done) => {
    srv.points.fetchBySession('session-1').then(
      (data) => {
        try {
          data.should.to.eql([
            {
              id: 'point-1',
              x: 1,
              y: 1,
              opacity: 75,
              session: {
                complete: true,
                id: 'session-1'
              }
            }
          ]);
          done();
        } catch(e) {
          done(e);
        }
      },
      (err) => done(err)
    );
  });
});