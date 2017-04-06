
export type Board = {
  id: ?string,
  name: string,
  session: Session,
  points: Array<Point>
}

export type Session = {
  id: ?string,
  complete: boolean
}

export type Point = {
  id: ?string,
  x: number,
  y: number,
  opacity: number,
  session: Session
}

export interface Model<Entity> {
  sync: () => Promise<Array<Entity>>,
  save: (data: Entity) => Promise<Array<Entity>>,
  fetch: () => Promise<Array<Entity>>
}