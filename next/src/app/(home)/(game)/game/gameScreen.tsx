'use client';

import { RefObject, useContext, useEffect, useRef } from 'react';
import { GameSocketContext } from '../createGameSocketContext';
import RenderInfo from './renderInfo';
import { useModal } from '../modalProvider';

//사용자의 환경에 따라 보내준다. 지금은 임시로 고정값으로 설정.
const CLIENT_WIDTH = 1000;
const CLIENT_HEIGHT = 500;

const GameScreen: React.FC = () => {
  const socket = useContext(GameSocketContext);
  const { openModal } = useModal();
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);
  const intervalID = useRef<NodeJS.Timer>(); // useRef로 변수를 정의
  let renderInfo = new RenderInfo();

  //키이벤트에 따라 값이 변경된다
  const keys = {
    w: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
  };

  /* 아래 모든 함수는 'validateSuccess' 이벤트를 받은 이후 실행된다.
    못 받을 경우 서버에서 소켓 연결이 끊기면서 /profile로 이동한다. */
  const updateRenderInfoListener = (data: any) => {
    const json = JSON.parse(data);
    renderInfo.update(json.gameMap, json.ball, json.gamePlayers);
  };

  const gameOverListener = (gameHistory: any) => {
    const json = JSON.parse(gameHistory);
    if (renderInfo.gamePlayers[socket.id].nickName == json.winnerNickname) {
      //혼자 테스트할 경우 항상 '이겼다'
      openModal('이겼다!');
    } else {
      openModal('졌다..');
    }
  };

  // 이벤트 핸들러를 명명된 함수로 정의
  const keyDownHandler = (event: any) => {
    if (!renderInfo.gamePlayers[socket.id]) return;
    switch (event.code) {
      case 'KeyW':
        keys.w.pressed = true;
        break;

      case 'KeyS':
        keys.s.pressed = true;
        break;
    }
  };

  const keyUpHandler = (event: any) => {
    if (!renderInfo.gamePlayers[socket.id]) return;
    switch (event.code) {
      case 'KeyW':
        keys.w.pressed = false;
        break;

      case 'KeyS':
        keys.s.pressed = false;
        break;
    }
  };

  const gameOverInPlayingListener = () => {
    openModal('버텨서 이겼다!');
  };

  const validateSuccessListener = () => {
    //?를 쓰기는 했으나, useEffect 내에서 실행되므로
    //사실상 canvasRef를 가져오는 것이 보장된다
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas) {
      canvas.width = CLIENT_WIDTH;
      canvas.height = CLIENT_HEIGHT;
    }

    //undateRenderInfo 이벤트를 받을 준비가 되었음을 알린다.
    socket.emit(
      'renderReady',
      JSON.stringify({
        clientWidth: CLIENT_WIDTH,
        clientHeight: CLIENT_HEIGHT,
      }),
    );

    //정보 업데이트. 백에서 15ms에 한 번씩 온다
    socket.on('updateRenderInfo', updateRenderInfoListener);

    //게임이 끝나면 모달창을 띄운다
    socket.on('gameOver', gameOverListener);

    //중간에 상대방 소켓이 끊어졌을 때 같은 모달창을 띄운다
    socket.on('gameOverInPlaying', gameOverInPlayingListener);

    window.addEventListener('keydown', keyDownHandler);

    window.addEventListener('keyup', keyUpHandler);

    //15ms에 한 번씩 서버에 현재 눌렸는지 값을 보내준다
    intervalID.current = setInterval(() => {
      if (keys.w.pressed) {
        socket.emit('keyDown', 'keyW');
      }
      if (keys.s.pressed) {
        socket.emit('keyDown', 'keyS');
      }
    }, 15);

    //재귀함수. 프레임수에 따라 반복해서 화면을 그려준다.
    if (ctx) {
      renderInfo.animate(ctx);
    }
  };

  //처음에 한 번만 실행된다
  useEffect(() => {
    //validate check
    socket.on('validateSuccess', validateSuccessListener);
    socket.emit('validateSocket');

    //마지막 언마운트에만 실행된다.
    return () => {
      clearInterval(intervalID.current);
      window.removeEventListener('keyup', keyUpHandler);
      window.removeEventListener('keydown', keyDownHandler);
      socket.off('validateSuccess', validateSuccessListener);
      socket.off('updateRenderInfo', updateRenderInfoListener);
      socket.off('gameOver', gameOverListener);
      socket.off('gameOverInPlaying', gameOverInPlayingListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default GameScreen;
