'use client'

import { RefObject, useEffect, useRef } from "react";

type GameScreenProps = {
  canvasWidth: number;
  canvasHeight: number;
};

const GameScreen
: React.FC<GameScreenProps> = ({
  canvasWidth,
  canvasHeight,
}) => {
    const canvasRef : RefObject<HTMLCanvasElement> = 
  useRef<HTMLCanvasElement>(null);//useRef 훅 호출 (호출하면서 타입이 결정된다?)
  
    useEffect(() => {//canvas 요소가 렌더링(마운트)된 시점을 보장함
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');//여기에 캔버스 컨텍스트가 할당되는 것이 보장됨

      const setCanvas = () => {
        if (canvas) {
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
        }
      };
      setCanvas();

      ctx?.fillRect(0, 0, ctx?.canvas.width, ctx?.canvas.height);

    }, [canvasWidth, canvasHeight]);
  
    return <canvas ref={canvasRef} />;//이 안의 내용을 설정해주고 반환하는 셈
  }

  export default GameScreen;
  