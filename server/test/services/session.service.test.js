
const chai = require('chai');
const should = chai.should();
const before = require('./before');
let srv = {};

describe('session service', () => {
  beforeEach((done) => {
    before((err, data) => {
      srv = data;
      done(err);
    });
  });
  it('#create', (done) => {
    srv.sessions.create().then(
      () => done(),
      (err) => done(err)
    );
  });
  it('#get', (done) => {
    srv.sessions.get('session-1').then(
      (data) => {
        try {
          data.should.to.eql(
            {
              id: 'session-1',
              complete: true
            }
          );
          done();
        } catch(e) {
          done(e);
        }
      },
      (err) => done(err)
    )
  });
  it('#complete', (done) => {
    srv.sessions.complete('session-1').then(
      () => done(),
      (err) => done(err)
    );
  });
});