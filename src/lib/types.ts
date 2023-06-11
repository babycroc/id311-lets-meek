export interface Color {
  background: string;
  main: string;
  hover: string;
}

export interface Group {
  id: string;
  name: string;
  meetings: string[];
  users: string[];
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
