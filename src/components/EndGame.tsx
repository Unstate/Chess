import { useState } from "react";

interface EndGameProps {
  whoLose: string;
  restart: () => void;
  isVisable: boolean;
}

const EndGame: React.FC<EndGameProps> = ({ whoLose, restart, isVisable }) => {
  const [visable, setVisable] = useState<boolean>(isVisable);

  const handleOnClick = (): void => {
    restart();
  };

  const closeWindow = (): void => {
    setVisable(false);
  };

  return (
    <>
      {visable && (
        <div className="fixed left-0 top-0 z-10 flex min-h-screen w-full items-center justify-center bg-slate-900">
          <main className="z-15 flex h-1/2 w-1/2 flex-col gap-y-3 rounded-lg bg-white p-5 text-center">
            <div className="flex justify-center items-center gap-2">
              <p>END GAME</p>
              <button
                className=" rounded-lg border-[2px] border-black p-2 hover:bg-black hover:text-white"
                onClick={closeWindow}
              >
                Close
              </button>
            </div>
            <p className=" uppercase">{whoLose} defeat!</p>
            <button
              className=" rounded-lg border-[2px] border-black p-2 hover:bg-black hover:text-white"
              onClick={() => handleOnClick()}
            >
              RESTART GAME
            </button>
          </main>
        </div>
      )}
    </>
  );
};

export default EndGame;
