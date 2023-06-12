export interface Color {
  name: string;
  background: string;
  main: string;
  hover: string;
}

export interface GroupType {
  id: string;
  name: string;
  meetings: string[];
  users: string[];
  invite: string;
}

export interface Meeting {
  id: string;
  colEnd: number;
  colStart: number;
  endTime: number;
  groupId: string;
  name: string;
  row: number;
  startTime: number;
  x: string;
  y: string;
}
