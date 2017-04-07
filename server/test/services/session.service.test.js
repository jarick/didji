
const chai = require('chai');
const should = chai.should();
const before = require('./before');
let context = {};

describe('session service', () => {
  beforeEach((done) => {
    before((err, data) => {
      context = data;
      done(err);
    });
  });
  it('#create', (done) => {
    context.sessions.create().then(
      () => done(),
      (err) => done(err)
    );
  });
  it('#get', (done) => {
    context.sessions.get('session-1').then(
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
    context.sessions.complete('session-1').then(
      () => done(),
      (err) => done(err)
    );
  });
});