import { down, left, mouse, Point, right, up } from "@nut-tree/nut-js";
import { ICommand, MoveDirections } from "./types";

export const moveMouse = async (command: ICommand): Promise<string | undefined> => {
  const direction = command.action.split('_')[1];
  
  if (direction) {
    if (command.param) {
      try {
        switch (direction.toUpperCase()) {
          case MoveDirections.LEFT:
            await mouse.move(left(command.param));
            return command.action;

          case MoveDirections.RIGHT:
            await mouse.move(right(command.param));
            return command.action;

          case MoveDirections.UP:
            await mouse.move(up(command.param));
            return command.action;

          case MoveDirections.DOWN:
            await mouse.move(down(command.param));
            return command.action;
        }
      } catch (error) {
         console.error(error);
         return undefined;
      }
    }
    const position: Point = await mouse.getPosition();

    return `${command.action} ${position.x}px,${position.y}px`;
  }
  console.error('command error');
  return undefined;
}

export const drawRectangle = async (command: ICommand): Promise<string | undefined> => {
  const l = command.param;
  const h = command.param2 ? command.param2 : l;
  if (l && h) {
    let positions: Point[] = [];
    let position: Point = await mouse.getPosition();
    for (let i = 0; i < l; i++ ) {
       const newPos: Point = new Point(position.x + i, position.y);
       positions = [...positions, newPos];
    }
    await mouse.setPosition(new Point(position.x + l - 1, position.y ));

    position = await mouse.getPosition();
    for (let i = 0; i < h -1; i++ ) {
       const newPos: Point = new Point(position.x, position.y + i);
       positions = [...positions, newPos];
    }
    await mouse.setPosition(new Point(position.x + 1, position.y + h));

    position = await mouse.getPosition();
    for (let i = 0; i < l - 1; i++ ) {
       const newPos: Point = new Point(position.x - i, position.y);
       positions = [...positions, newPos];
    }
    await mouse.setPosition(new Point(position.x - l, position.y));

    await mouse.drag(positions)
  }

  return command.action;
}