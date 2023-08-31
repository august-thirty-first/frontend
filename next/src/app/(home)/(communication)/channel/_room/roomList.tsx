'use client';
import { useFetch } from '@/lib/useFetch';
import ChatRoom from '@/interfaces/chatRoom.interface';
import { useEffect, useRef, useState } from 'react';
import RoomDetails from '@/app/(home)/(communication)/channel/_room/roomDetails';
import useSWR from 'swr';

export default function RoomList({
  listAPI,
  joinAPI,
  swrKey,
}: {
  listAPI: string;
  joinAPI: string;
  swrKey: string;
}) {
  const [scrollRef, setScrollRef] = useState<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (scrollRef) {
      scrollRef.scrollTop = scrollRef.scrollHeight;
    }
  };

  useEffect(() => {
    if (scrollRef) {
      scrollRef.scrollTop = scrollRef.scrollHeight;
    }
  }, [scrollRef]);

  const { dataRef, fetchData } = useFetch<ChatRoom[]>({
    autoFetch: true,
    method: 'GET',
    url: listAPI,
  });

  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useSWR(swrKey, fetchData);

  const openDetails = (
    room: ChatRoom,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setSelectedRoom(room);
    setMenuPosition({ top: event.clientY, left: event.clientX });
  };

  const closeDetails = () => {
    setSelectedRoom(null);
    setMenuPosition(null);
  };

  return (
    <div className="border-gray-300 border rounded p-4">
      <div className="max-h-96 overflow-y-auto" ref={ref => setScrollRef(ref)}>
        {dataRef?.current &&
          dataRef?.current.map((room: ChatRoom, index: number) => (
            <div key={index} className={index >= 0 ? 'mb-0.25' : ''}>
              <button
                className={`bg-cyan-500 text-white px-3 py-1 rounded ${
                  selectedRoom === room ? 'opacity-50' : ''
                }`}
                onClick={event => {
                  openDetails(room, event);
                }}
              >
                {`[${room.id}] ${room.room_name}`}
              </button>
            </div>
          ))}
        {selectedRoom && menuPosition && (
          <div
            className="fixed"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              zIndex: 9999,
            }}
          >
            <RoomDetails
              room={selectedRoom}
              joinAPI={joinAPI}
              onClose={closeDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
}
