import { useEffect, useState } from "react";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";
import Timer from "./components/Timer";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";

const App = () => {
  const [board, setBoard] = useState(new Board());
  const whitePlayer = new Player(Colors.WHITE);
  const blackPlayer = new Player(Colors.BLACK);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
  }, []);

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }
  return (
    <div className="flex min-h-screen w-full justify-center bg-slate-300 p-5">
      <div className="flex w-[100px] flex-col gap-5 md:w-[200px] lg:w-[300px] xl:w-[500px] 2xl:w-[500px]">
        <Timer
          restart={restart}
          currentPlayer={currentPlayer}
          duration={300}
          board={board}
        />
        <LostFigures figures={board.lostBlackFigures} title="Black figures" />
        <LostFigures figures={board.lostWhiteFigures} title="White figures" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        {board.whiteCheck || board.blackCheck ? (
          <h3>It`s check! Protect the king</h3>
        ) : (
          <></>
        )}
        <BoardComponent
          restart={restart}
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        ></BoardComponent>
      </div>
    </div>
  );
};

export default App;
