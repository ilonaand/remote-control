import { IActionMap, ICommand } from './types';


import { moveMouse, drawRectangle, drawСircle, prntScrn } from './actions';

export const actionMap:  IActionMap = {
  "mouse_left": (command: ICommand): Promise<string | undefined> => moveMouse(command),
  "mouse_right": (command: ICommand): Promise<string | undefined> => moveMouse(command),
  "mouse_up": (command: ICommand): Promise<string | undefined> => moveMouse(command),
  "mouse_down": (command: ICommand): Promise<string | undefined> => moveMouse(command),
  "mouse_position": (command: ICommand): Promise<string | undefined> => moveMouse(command),
  "draw_square": (command: ICommand): Promise<string | undefined> => drawRectangle(command),
  "draw_rectangle": (command: ICommand): Promise<string | undefined> => drawRectangle(command),
  "draw_circle": (command: ICommand): Promise<string | undefined> => drawСircle(command),
  "prnt_scrn": (command: ICommand): Promise<string | undefined> => prntScrn(command),
  
}