import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/bB.png";
import whiteLogo from "../../assets/wB.png";

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell); // вызов constructor у родительского класса Figure
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if(this.cell.isEmptyDiagonal(target)) {
        return true
    }
    return false;
  }
}
