'use client';

import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { GameSocketContext } from '../createGameSocketContext';
import RenderInfo from './renderInfo';

//사용자의 환경에 따라 보내준다. 지금은 임시로 고정값으로 설정.
const CLIENT_WIDTH = 1000;
const CLIENT_HEIGHT = 500;

const GameScreen: React.FC = () => {
  const socket = useContext(GameSocketContext);
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  let renderInfo = new RenderInfo(); //빈 객체로 초기화

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas) {
      canvas.width = CLIENT_WIDTH;
      canvas.height = CLIENT_HEIGHT;
    }

    socket.emit(
      'renderReady',
      JSON.stringify({
        clientWidth: canvas?.width,
        clientHeight: canvas?.height,
      }),
    );

    //TODO: 정보 업데이트. 15ms에 한 번씩 온다
    socket.on('updateRenderInfo', data => {
      const json = JSON.parse(data);
      renderInfo.update(json.gameMap, json.ball, json.gamePlayers);
      console.log(renderInfo);
    });

    //TODO: 키 이벤트 감지하고, 내 정보 바꿔서 그리고, socket event에 보내기
    window.addEventListener('keydown', () => {
      console.log('key pressed');
    });

    if (ctx) {
      //TODO: animate()를 대신하여, 변경사항이 있을 때마다 그려준다. (저장된 renderInfo 사용, canvas fill 호출)
      renderInfo.draw(ctx);
    }
  });

  return <canvas ref={canvasRef} />;
};

export default GameScreen;
