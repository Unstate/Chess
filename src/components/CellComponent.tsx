// import { Cell } from "../models/Cell";

// interface CellComponentProps {
//   cell: Cell;
//   selected: boolean;
//   handleOnClick: (cell: Cell) => void;
// }

// const CellComponent: React.FC<CellComponentProps> = ({
//   cell,
//   selected,
//   handleOnClick,
// }) => {
//   return (
//     <div
//       onClick={() => handleOnClick(cell)}
//       className={`flex h-16 w-16 items-center justify-center 
//       ${cell.color} 
//       ${selected ? "bg-lime-400" : ""} 
//       ${cell.available && cell.figure ? " bg-red-600" : ""} `}
//     >
//       {cell.available && !cell.figure && (
//         <div className=" h-3 w-3 rounded-full bg-lime-400" />
//       )}
//       {cell.figure?.logo && (
//         <img className="relative h-[64px]" src={cell.figure.logo} />
//       )}
//     </div>
//   );
// };

// export default CellComponent;

import { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponents: FC<CellProps> = ({ cell, selected, click }) => {
  return (
    <div
      className={`flex h-[16px] w-[16px] 2xl:h-[64px] 2xl:w-[64px] xl:h-[64px] xl:w-[64px] lg:h-[64px] lg:w-[64px] md:h-[32px] md:w-[32px] sm:h-[32px] sm:w-[32px]  items-center justify-center 
    ${cell.color} 
    ${selected ? "bg-lime-400" : ""} 
    ${cell.available && cell.figure ? " bg-red-600" : ""} `}
      onClick={() => click(cell)}
      style={{ background: cell.available && cell.figure ? "green" : "" }}
    >
      {cell.available && !cell.figure && (
        <div className=" h-3 w-3 rounded-full bg-lime-400" />
      )}
      {cell.figure?.logo && (
        <img className="relative 2xl:h-[64px] xl:h-[64px] lg:h-[64px] md:h-[32px] h-[16px]" src={cell.figure.logo} />
      )}
    </div>
  );
};

export default CellComponents;
