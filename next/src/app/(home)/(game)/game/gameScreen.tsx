'use client';

import { RefObject, useContext, useEffect, useRef } from 'react';
import { GameSocketContext } from '../createGameSocketContext';

const GameScreen: React.FC = () => {
  const socket = useContext(GameSocketContext);
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    socket.emit('renderReady', { innerWidth, innerHeight });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    //set canvas
    if (canvas) {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }

    if (ctx) {
      // animate(ctx);

      //fill background
      ctx.fillStyle = 'rgb(31, 31, 36)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      //ball
      ctx.beginPath();
      ctx.fillStyle = 'rgb(102, 103, 171)';
      ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 10, 0, 10);
      ctx.fill();

      //player left (bar)
      ctx.fillStyle = 'rgb(102, 103, 171)';
      ctx.fillRect(
        (ctx.canvas.width / 64) * 2,
        ctx.canvas.height / 4,
        ctx.canvas.width / 64,
        ctx.canvas.height / 2,
      );

      //player right (bar)
      ctx.fillStyle = 'rgb(102, 103, 171)';
      ctx.fillRect(
        (ctx.canvas.width / 64) * (64 - 2 /*앞에 숫자*/ - 1) /*너비*/,
        ctx.canvas.height / 4,
        ctx.canvas.width / 64,
        ctx.canvas.height / 2,
      );
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default GameScreen;
