
export type BoardEntity = {
  id: ?string,
  name: string,
  session: string
}

export type SessionEntity = {
  id: ?string,
  complete: boolean
}

export type PointEntity = {
  id: ?string,
  x: number,
  y: number,
  opacity: number,
  session: string
}

