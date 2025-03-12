"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./labirinto.module.css";

const ROWS = 10;
const COLS = 10;

const mazeLayout = [
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 0], //não
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 1, 0, 1, 0, 0, 1, 1],
  [1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 0] //sim
];

const MazeGame: React.FC = () => {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [mazeSize, setMazeSize] = useState(40);
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  useEffect(() => {
    if ((playerPos.x === COLS - 1 && playerPos.y === ROWS - 1) || 
        (playerPos.x === COLS - 1 && playerPos.y === 0)) {
      setGameOver(true);
      setTimeout(() => {
        if (playerPos.y === ROWS - 1) {
          window.location.href = "/sim";
        } else if (playerPos.y === 0) {
          window.location.href = "/nao";
        }
      }, 1000);
    }
  }, [playerPos]);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.img}>
        <h1>Aceita Sair Comigo</h1>
        <p>Tempo: {timeLeft}s</p>
        {gameOver && <p className={styles.winMessage}>Fim do jogo! 🎉</p>}
      </div>
      <div className={styles.maze} style={{ width: `${mazeSize * COLS}px`, height: `${mazeSize * ROWS}px`, gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
        {mazeLayout.map((row, rowIndex) => row.map((cell, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className={cell === 1 ? styles.wall : styles.path} />
        )))}
        <div className={styles.player} style={{ left: `${playerPos.x * mazeSize}px`, top: `${playerPos.y * mazeSize}px` }}>
          <Image src="/nos.jpeg" alt="Bus" width={mazeSize} height={mazeSize} />
        </div>
        <div className={styles.goal} style={{ left: `${(COLS - 1) * mazeSize}px`, top: `0px`, width: mazeSize, height: mazeSize }}>NÃO</div>
        <div className={styles.goal} style={{ left: `${(COLS - 1) * mazeSize}px`, top: `${(ROWS - 1) * mazeSize}px`, width: mazeSize, height: mazeSize }}>SIM</div>
      </div>
    </div>
  );
};

export default MazeGame;
