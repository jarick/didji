
const fs = require('fs');
const path = require('path');
import services from '../../services/index.service';
import config from '../../config/test';


const copy = (file) => {
  const targetFile = path.join(path.dirname(path.dirname(__dirname)), 'data', 'test', file);
  const sourceFile = path.join(path.dirname(__dirname), 'fixtures', file);
  fs.writeFileSync(targetFile, fs.readFileSync(sourceFile));
};

module.exports = (done) => {
  copy('boards.json');
  copy('points.json');
  copy('points.json');
  services(config).then(
    (result) => {
      done(null, result);
    },
    (err) => done(err, null)
  );
};