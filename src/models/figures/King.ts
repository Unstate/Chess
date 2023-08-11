import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/bK.png";
import whiteLogo from "../../assets/wK.png";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell); // вызов constructor у родительского класса Figure
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (
      Math.abs(target.x - this.cell.x) > 1 ||
      Math.abs(target.y - this.cell.y) > 1
    ) {
      return false;
    }

    if (this.cell.isEmptyVertical(target)) {
      return true;
    }

    if (this.cell.isEmptyHorizontal(target)) {
      return true;
    }

    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }
    if (!this.cell.board.isCellUnderAttack(target, this.color)) {
      return false;
    }

    return false;
  }
}
