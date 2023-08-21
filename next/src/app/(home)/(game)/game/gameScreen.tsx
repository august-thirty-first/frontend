'use client';

import { RefObject, useContext, useEffect, useRef } from 'react';
import { GameSocketContext } from '../createGameSocketContext';
import RenderInfo from './renderInfo';

//사용자의 환경에 따라 보내준다. 지금은 임시로 고정값으로 설정.
const CLIENT_WIDTH = 1000;
const CLIENT_HEIGHT = 500;

const GameScreen: React.FC = () => {
  const socket = useContext(GameSocketContext);
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  //처음에 한 번만 보내준다
  socket.emit(
    'renderReady',
    JSON.stringify({
      clientWidth: CLIENT_WIDTH,
      clientHeight: CLIENT_HEIGHT,
    }),
  );

  useEffect(() => {
    let renderInfo = new RenderInfo(); //빈 객체로 초기화
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas) {
      canvas.width = CLIENT_WIDTH;
      canvas.height = CLIENT_HEIGHT;
    }

    //정보 업데이트. 15ms에 한 번씩 온다
    socket.on('updateRenderInfo', data => {
      const json = JSON.parse(data);
      renderInfo.update(json.gameMap, json.ball, json.gamePlayers);
    });

    //키 이벤트 감지하고, 내 정보 바꿔서 그리고, socket event에 보내기
    const keys = {
      w: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
    };
    window.addEventListener('keydown', event => {
      if (!renderInfo.gamePlayers[socket.id]) return;
      switch (event.code) {
        case 'KeyW':
          keys.w.pressed = true;
          break;

        case 'KeyS':
          keys.s.pressed = true;
          break;
      }
    });

    window.addEventListener('keyup', event => {
      if (!renderInfo.gamePlayers[socket.id]) return;
      switch (event.code) {
        case 'KeyW':
          keys.w.pressed = false;
          break;

        case 'KeyS':
          keys.s.pressed = false;
          break;
      }
    });

    setInterval(() => {
      if (keys.w.pressed) {
        renderInfo.gamePlayers[socket.id].bar.position.y -=
          renderInfo.gamePlayers[socket.id].bar.velocity.y;
        socket.emit('keyDown', 'keyW');
      }
      if (keys.s.pressed) {
        renderInfo.gamePlayers[socket.id].bar.position.y +=
          renderInfo.gamePlayers[socket.id].bar.velocity.y;
        socket.emit('keyDown', 'keyS');
      }
    }, 15);

    //재귀함수. 반복해서 그려준다.
    if (ctx) {
      renderInfo.animate(ctx);
    }
  }, [socket]);

  return <canvas ref={canvasRef} />;
};

export default GameScreen;
