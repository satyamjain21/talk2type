import { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const createRoom = () => {
    const newRoomId = uuidv4(); // Generate unique ID
    router.push(`/room/${newRoomId}`);
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      router.push(`/room/${roomId}`);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Voice-to-Text Rooms</h1>
      <button onClick={createRoom} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Create Room
      </button>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="p-2 border rounded-md mb-2"
      />
      <button onClick={joinRoom} className="px-4 py-2 bg-green-500 text-white rounded-md">
        Join Room
      </button>
    </div>
  );
}
