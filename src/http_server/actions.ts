import { down, left, mouse, Point, right, straightTo, up } from "@nut-tree/nut-js";
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
  const length = command.param;
  const height = command.param2 ? command.param2 : length;
  if (length && height) {
    let positions: Point[] = [];

    let position: Point = await mouse.getPosition();
    for (let i = 0; i < length; i++ ) {
       const newPos: Point = new Point(position.x + i, position.y);
       positions = [...positions, newPos];
    }
    await mouse.setPosition(new Point(position.x + length - 1, position.y ));

    position = await mouse.getPosition();
    for (let i = 0; i < height-1; i++ ) {
       const newPos: Point = new Point(position.x, position.y + i);
       positions = [...positions, newPos];
    }
    await mouse.setPosition(new Point(position.x , position.y + height));

    position = await mouse.getPosition();
    for (let i = 0; i < length-1; i++ ) {
       const newPos: Point = new Point(position.x - i, position.y);
       positions = [...positions, newPos];
    }
    await mouse.setPosition(new Point(position.x - length, position.y));

    await mouse.drag((positions));

  }

  return command.action;
}

export const drawСircle = async (command: ICommand): Promise<string | undefined> => {
  const radius = command.param;

  if (radius) {
    let positions: Point[] = [];
    const center: Point = await mouse.getPosition();
    await mouse.setPosition(new Point(center.x + radius, center.y));

    for (let i = 0; i < 2 * Math.PI ; i+= Math.PI/1440 ) {
       const x = center.x + radius * Math.cos(i);
       const y = center.y + radius * Math.sin(i);;
       const newPos: Point = new Point(x, y);
       positions = [...positions, newPos];
    }
    
    await mouse.drag((positions));
  }

  return command.action;
}