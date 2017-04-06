
import type {Config} from '../contracts/services';
import type {Model} from '../contracts/models';

const path = require('path');
const fs = require('fs');

export default class XmlModel<Entity> implements Model {

  data: Array<Entity>;

  get file() {
    throw new Error('Method must be overridden');
  }

  get jsonFile() {
    return path.join(this.config.data, this.file);
  }

  constructor(config: Config) {
    this.config = config;
    this.data = [];
  }

  sync() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.jsonFile, {encoding: 'utf-8'}, (err, jsonString) => {
        this.data = JSON.parse(jsonString);
        if (err) {
          reject(err);
        } else {
          resolve(this.data);
        }
      });
    });
  }

  save(data: Entity) {
    return new Promise((resolve, reject) => {
      this.data = this.data.concat([data]);
      fs.writeFile(this.jsonFile, JSON.stringify(this.data), {encoding: 'utf-8'}, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.data);
        }
      });
    });
  }

  fetch() {
    return Promise.resolve(this.data.slice());
  }

}