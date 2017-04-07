
import type {Board, Session, Point} from './models';

export type Config = {
  data: string
}

export interface BoardService {
  get: () => Promise<Board>,
  complete: (id: string) => Promise<void>
}

export interface SessionService {
  create: () => Promise<string>,
  get: (id: string) => Promise<Session>,
  complete: (id: string) => Promise<void>
}

export interface PointService {
  create: (point: Point) => Promise<void>,
  fetchBySession: (sessionId: string) => Promise<Array<Point>>
}

export type Services = {
  boards: BoardService,
  sessions: SessionService,
  points: PointService
}