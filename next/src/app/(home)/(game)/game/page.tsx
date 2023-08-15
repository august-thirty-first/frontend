'use client'

import { RefObject, useRef } from "react";
import GameScreen from "./gameScreen";
import { useClientWidthHeight } from "./useClientWidthHeight";

const style = {
  width: "1000px",
  height: "500px",
}
export default function GamePage() {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const clientRect = useClientWidthHeight(mainRef);
  const canvasWidth = clientRect.width;
  const canvasHeight = clientRect.height;

  return (
    <main style={style} ref={mainRef}>
      <GameScreen 
      canvasWidth={canvasWidth}
      canvasHeight={canvasHeight}
    />
    </main>
  )
  
};
