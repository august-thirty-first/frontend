'use client';

import { useState } from "react";
import PlayLadderModalBody from "./playLadderModalBody";

const PlayLadderModal = () => {
	const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

	return (
		<div>
	<button onClick={clickModal}>레더큐모달테스트</button>
	{ showModal && <PlayLadderModalBody />/*모달 컴포넌트가 이곳에 위치하고 이 body가 들어간다.*/ }
	</div>
	)
}

export default PlayLadderModal;
