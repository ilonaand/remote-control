export interface ICommand  {
  action: string;
  param?: number;
  param2?: number;
}

export enum MoveDirections {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN"
}

export interface IHandle { (command: ICommand): Promise<string | undefined> } ;

export interface IActionMap { [key: string]: IHandle }; 
