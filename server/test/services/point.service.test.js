
const chai = require('chai');
const should = chai.should();
const before = require('./before');
let context = {};

describe('points service', () => {
  beforeEach((done) => {
    before((err, data) => {
      context = data;
      done(err);
    });
  });
  it('#create', (done) => {
    context.points.create(1, 1, 75, 'session-1').then(
      () => done(),
      (err) => done(err)
    );
  });
  it('#fetchBySession', (done) => {
    context.points.fetchBySession('session-1').then(
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