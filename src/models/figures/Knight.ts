import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/bKn.png";
import whiteLogo from "../../assets/wKn.png";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell); // вызов constructor у родительского класса Figure
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isKnightMove(target)) {
      return true;
    }
    return false;
  }
}
