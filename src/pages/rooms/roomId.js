import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, doc, setDoc, onSnapshot } from "../../firebaseConfig";

const Room = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  let recognition;

  const startListening = () => {
    setIsRecording(true);
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const newText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setText(newText);
      updateFirestore(newText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsRecording(false);
    recognition.stop();
  };

  const updateFirestore = async (newText) => {
    if (!roomId) return;
    try {
      await setDoc(doc(db, "rooms", roomId), { transcript: newText }, { merge: true });
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  useEffect(() => {
    if (!roomId) return;
    const unsub = onSnapshot(doc(db, "rooms", roomId), (docSnap) => {
      if (docSnap.exists()) {
        setTranscript(docSnap.data().transcript);
      }
    });

    return () => unsub();
  }, [roomId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Room ID: {roomId}</h1>
      <button
        onClick={isRecording ? stopListening : startListening}
        className={`px-4 py-2 text-white rounded-md ${isRecording ? "bg-red-500" : "bg-blue-500"}`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <h2 className="text-xl font-semibold mt-4">Live Transcript:</h2>
      <p className="p-2 bg-gray-100 rounded-md">{transcript}</p>
    </div>
  );
};

export default Room;
