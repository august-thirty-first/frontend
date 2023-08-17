'use client';

import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { GameSocketContext } from '../createGameSocketContext';
import RenderInfo from './renderInfo';

const GameScreen: React.FC = () => {
  const socket = useContext(GameSocketContext);
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  // const [renderInfo, setRenderInfo] = useState(new RenderInfo(0));
  const renderInfo = new RenderInfo(); //받은 정보 넣어서 생성
  // 기본값으로 채워넣을 순 이쓴데 nickname 없음

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
      //TODO: 키 이벤트 감지하고, 내 정보 바꿔서 그리고, socket event에 보내기
      window.addEventListener('keydown', () => {
        console.log('key pressed');
        // setRenderInfo(new RenderInfo(50));
      });

      //TODO: socket.on("updateRenderData")로 받아서 정보 업데이트. 15ms에 한 번씩 온다
      // renderInfo.update();

      //TODO: animate()를 대신하여, 변경사항이 있을 때마다 그려준다. (저장된 renderInfo 사용, canvas fill 호출)
      //변경사항이 있을 때마다 그려지지 않음...
      renderInfo.draw(ctx);
    }
  }, [renderInfo]);

  return <canvas ref={canvasRef} />;
};

export default GameScreen;
