import { Cell } from "../Cell";
import { Colors } from "../Colors";
import logo from "../../assets/whiteRook.png";

export enum FigureNames {
  FIGURE = "Figure",
  KING = "King",
  KNIGHT = "Knight",
  PAWN = "Pawn",
  QUEEN = "Queen",
  ROOK = "Rook",
  BISHOP = "Bishop",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;
  isFirstStep: boolean;

  constructor(color: Colors, cell: Cell) {
    // у фигуры при отрисовке обязательно должен быть цвет и координаты фигуры, чтобы отрисовать
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
    this.isFirstStep = true;
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    if (
      (target.board.whiteCheck || target.board.blackCheck) &&
      target.available === false
    ) {
      return false;
    }
    return true;
  }

  moveFigure(_target: Cell) {
    this.isFirstStep = false;
  }

}
