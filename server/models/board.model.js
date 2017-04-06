
import type { BoardEntity } from '../contracts/entities';
import XmlModel from './base.model';

export default class BoardModel extends XmlModel<BoardEntity> {

  get file() {
    return 'boards.json';
  }

}