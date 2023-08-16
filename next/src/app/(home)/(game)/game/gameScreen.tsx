'use client';

import { RefObject, useContext, useEffect, useRef } from 'react';
import { GameSocketContext } from '../createGameSocketContext';
import RenderInfo from './renderInfo';

const GameScreen: React.FC = () => {
  const socket = useContext(GameSocketContext);
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  // let renderInfo = new RenderInfo(); // 생성을 어디서 해야 할까?

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

    //TODO: 키 이벤트 감지하고, 내 정보 바꿔서 그리고, socket event에 보내기
    // window.addEventListener('keydown', event => {
    //   console.log('key pressed');
    // });

    if (ctx) {
      //TODO: socket.on("updateRenderData")로 받아서 정보 업데이트. 15ms에 한 번씩 온다
      // renderInfo.update();

      //TODO: animate()를 대신하여, 변경사항이 있을 때마다 그려준다. (저장된 renderInfo 사용, canvas fill 호출)
      const renderInfo = new RenderInfo();
      renderInfo.draw(ctx);
    }
  });

  return <canvas ref={canvasRef} />;
};

export default GameScreen;
