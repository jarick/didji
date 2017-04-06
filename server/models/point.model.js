
import type { PointEntity } from '../contracts/entities';
import XmlModel from './base.model';

export default class PointModel extends XmlModel<PointEntity> {

  get file() {
    return 'points.json';
  }

}