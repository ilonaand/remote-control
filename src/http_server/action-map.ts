import { IActionMap, ICommand } from './types';


import { moveMouse, drawRectangle } from './actions';

export const actionMap:  IActionMap = {
  "mouse_left": (command: ICommand): Promise<string | undefined> => moveMouse(command),
  "mouse_right": (command: ICommand): Promise<string | undefined> => moveMouse(command),
  "mouse_up": (command: ICommand): Promise<string | undefined> => moveMouse(command),
  "mouse_down": (command: ICommand): Promise<string | undefined> => moveMouse(command),
  "mouse_position": (command: ICommand): Promise<string | undefined> => moveMouse(command),
  "draw_square": (command: ICommand): Promise<string | undefined> => drawRectangle(command),
  "draw_rectangle": (command: ICommand): Promise<string | undefined> => drawRectangle(command)
}