import React, { FC, useEffect, useState } from "react";
// import { Button, Modal } from "react-bootstrap";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { FigureNames } from "../models/figures/Figure";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";
import blackLogoQueen from "../assets/bQ.png";
import whiteLogoQueen from "../assets/wQ.png";
import blackLogoKnight from "../assets/bKn.png";
import whiteLogoKnight from "../assets/wKn.png";
import blackLogoBishop from "../assets/bB.png";
import whiteLogoBishop from "../assets/wB.png";
import blackLogoRook from "../assets/bR.png";
import whiteLogoRook from "../assets/whiteRook.png";
import { Colors } from "../models/Colors";

interface BoardProps {
  restart: () => void;
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = React.memo(
  ({ board, setBoard, currentPlayer, swapPlayer, restart }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    // For modal block
    // const [show, setShow] = useState(true);
    // const handleClose = () => setShow(false);

    function click(cell: Cell) {
      if (selectedCell && selectedCell !== cell && cell.available) {
        selectedCell?.moveFigure(cell);
        board.pawnReady();
        swapPlayer();
        board.isCheckmate(currentPlayer?.color);
        setSelectedCell(null);
      } else {
        if (cell.figure?.color === currentPlayer?.color) {
          setSelectedCell(cell);
        }
        if (!cell.figure) {
          setSelectedCell(null);
        }
      }
    }

    useEffect(() => {
      highlightCells();
    }, [selectedCell]);

    function highlightCells() {
      board.highlightCells(selectedCell, currentPlayer?.color);
      updateBoard();
    }

    function updateBoard() {
      const newBoard = board.getCopyBoard();
      setBoard(newBoard);
    }

    const handleRestartMate = () => {
      board.checkmate = false;
      restart();
    };
    const handleRestartPromote = (type: FigureNames) => {
      if (board.promotePawnCell) {
        board.promotePawn(
          board.promotePawnCell?.figure?.color,
          board.promotePawnCell,
          type
        );
      }
      board.promotePawnCell = null;
      updateBoard();
    };

    return (
      <>
        {board.checkmate || board.stalemate ? (
          <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center">
            <div className="z-20 flex h-1/2 w-1/2 flex-col items-center justify-center gap-2 rounded-lg border-2 border-black bg-white text-center">
              <div>
                <p>{board.checkmate ? "That`s mate!" : "That`s stalemate"}</p>
                <p>
                  {board.checkmate
                    ? ` ${
                        board.blackCheck ? "White" : "Black"
                      } wins! Congratulations! One
            more game?`
                    : "It`s a draw! One more game?"}
                </p>
              </div>
              <button
                onClick={handleRestartMate}
                className="rounded-lg border-[2px] border-black p-3 hover:border-black hover:bg-black hover:text-white"
              >
                New game
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        {board.promotePawnCell ? (
          <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center">
            <div className="z-20 flex h-1/2 w-1/2 flex-col items-center justify-center gap-2 rounded-lg border-2 border-black bg-white text-center">
              <div className="flex flex-col gap-2">
                <p>Choose the figure to promote your pawn!</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRestartPromote(FigureNames.QUEEN)}
                    className="p-2 hover:border-black hover:border-2 hover:rounded-lg " 
                  >
                    <img
                      className="relative h-[16px] md:h-[32px] lg:h-[64px] xl:h-[64px] 2xl:h-[64px]"
                      src={
                        currentPlayer?.color === Colors.WHITE
                          ? blackLogoQueen
                          : whiteLogoQueen
                      }
                    />
                  </button>
                  <button
                    onClick={() => handleRestartPromote(FigureNames.KNIGHT)}
                    className="p-2 hover:border-black hover:border-2 hover:rounded-lg "
                  >
                    <img
                      className="relative h-[16px] md:h-[32px] lg:h-[64px] xl:h-[64px] 2xl:h-[64px]"
                      src={
                        currentPlayer?.color === Colors.WHITE
                          ? blackLogoKnight
                          : whiteLogoKnight
                      }
                    />
                  </button>
                  <button
                    onClick={() => handleRestartPromote(FigureNames.BISHOP)}
                    className="p-2 hover:border-black hover:border-2 hover:rounded-lg "
                  >
                    <img
                      className="relative h-[16px] md:h-[32px] lg:h-[64px] xl:h-[64px] 2xl:h-[64px]"
                      src={
                        currentPlayer?.color === Colors.WHITE
                          ? blackLogoBishop
                          : whiteLogoBishop
                      }
                    />
                  </button>
                  <button
                    onClick={() => handleRestartPromote(FigureNames.ROOK)}
                    className="p-2 hover:border-black hover:border-2 hover:rounded-lg "
                  >
                    <img
                      className="relative h-[16px] md:h-[32px] lg:h-[64px] xl:h-[64px] 2xl:h-[64px]"
                      src={
                        currentPlayer?.color === Colors.WHITE
                          ? blackLogoRook
                          : whiteLogoRook
                      }
                    />
                  </button>
                </div>
              </div>
              <button
                onClick={handleRestartMate}
                className="rounded-lg border-[2px] border-black p-3 hover:border-black hover:bg-black hover:text-white hover:border-2 hover:rounded-lg "
              >
                New game
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <main className="flex h-[128px] w-[128px] flex-wrap md:h-[256px] md:w-[256px] lg:h-[512px] lg:w-[512px] xl:h-[512px] xl:w-[512px] 2xl:h-[512px] 2xl:w-[512px]">
          {board.cells.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent
                  click={click}
                  cell={cell}
                  key={cell.id}
                  selected={
                    cell.x === selectedCell?.x && cell.y === selectedCell?.y
                  }
                />
              ))}
            </React.Fragment>
          ))}
        </main>
      </>
    );
  }
);

export default BoardComponent;
