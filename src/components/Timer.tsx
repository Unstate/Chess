import { useEffect, useRef, useState } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
// import LostFigures from "./LostFigures";
import { Board } from "../models/Board";
import EndGame from "./EndGame";
// import LostFigures from "./LostFigures";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  board: Board;
  duration: number;
}

const Timer: React.FC<TimerProps> = ({
  currentPlayer,
  restart,
  // board,
  duration,
}) => {
  const [whiteTime, setWhiteTime] = useState(duration);
  const [blackTime, setBlackTime] = useState(duration);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (timer.current) {
      clearInterval(timer.current);
    }

    if (currentPlayer?.color === Colors.WHITE) {
      if (whiteTime > 0) {
        intervalId = setInterval(() => {
          decrementWhiteTimer();
        }, 1000);
      }

      return () => clearInterval(intervalId);
    }

    if (currentPlayer?.color === Colors.BLACK) {
      if (blackTime > 0) {
        intervalId = setInterval(() => {
          decrementBlackTimer();
        }, 1000);
      }
    }

    return () => clearInterval(intervalId);
  }, [currentPlayer]);

  const decrementBlackTimer = () => {
    setBlackTime((prev) => prev - 1);
  };

  const decrementWhiteTimer = () => {
    setWhiteTime((prev) => prev - 1);
  };

  const handleRestart = () => {
    setBlackTime(duration);
    setWhiteTime(duration);
    restart();
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <aside className="relative right-[60px] flex flex-col 2xl:flex-row xl:flex-row items-center gap-5">
      <section>
        <button
          className="rounded-lg border-[2px] border-black p-3 hover:border-black hover:bg-black hover:text-white"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      </section>
      <section className={`rounded-lg border-[2px] border-black p-3 ${currentPlayer?.color === Colors.BLACK && 'bg-lime-400'}`}>
        Black -{" "}
        {blackTime > 0 ? (
          formatTime(blackTime)
        ) : (
          <EndGame
            whoLose={"black"}
            restart={handleRestart}
            isVisable={true}
          ></EndGame>
        )}
      </section>
      <section className={`rounded-lg border-[2px] border-black p-3 ${currentPlayer?.color === Colors.WHITE && 'bg-lime-400'}`}>
        White -{" "}
        {whiteTime > 0 ? (
          formatTime(whiteTime)
        ) : (
          <EndGame
            whoLose={"white"}
            restart={handleRestart}
            isVisable={true}
          ></EndGame>
        )}
      </section>
    </aside>
  );
};

export default Timer;
