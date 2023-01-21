
import { ICommand } from "./types";

import { actionMap } from './action-map';

export const handler = async (commandStr: string): Promise<string | undefined> => {
  console.log('received: %s', commandStr);
  const commandParams: string[] = commandStr.split(' ');

  const command: ICommand = {
    action: commandParams[0],
    param: commandParams[1]? Number(commandParams[1]) : undefined,
    param2:  commandParams[2]? Number(commandParams[2]) : undefined,
  }
  if (Object.keys(actionMap).includes(command.action)) return actionMap[command.action](command);

  return undefined;
}

