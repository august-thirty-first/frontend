'use client'

import { RefObject, useEffect, useState } from "react";

export const useClientWidthHeight = (ref: RefObject<HTMLElement>) => {
    //undefined를 반환하면 이 함수의 반환값이 할당되는 canvas.height와 타입에러가 나므로 0을 넣어주었다. 
    //어차피 아래에서 useEffect를 사용하고 있으므로 width, height는 정상적으로 할당되는 것이 보장된다.
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        const setClientWidthHeight = () => {
            if (ref.current) {
                setWidth(ref.current.clientWidth);//사용자의 화면크기가 바뀔 때마다 새로고침없이 대응된다
                setHeight(ref.current.clientHeight);
            }
        };

        window.addEventListener('resize', setClientWidthHeight);//main요소의 크기가 바뀔 때 대응된다

        return () => {
            window.addEventListener('resize', setClientWidthHeight);
        };
    }, []);

    const clientRects = { width, height };

    return clientRects;
}