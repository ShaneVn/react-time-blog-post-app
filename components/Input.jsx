import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react";

// import data from '@emoji-mart/data'
// import { Picker } from 'emoji-mart'

import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function Input() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const {data: session} =useSession()

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      userID: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div
      className={`overflow-y-scroll border-b border-gray-700 p-3 flex
    space-x-3 scrollbar-hide ${loading && "opacity-60"}`}
    >
      <img
        src={session.user.image}
        className=" h-11 w-11 rounded-full cursor-pointer"
        alt=""
      />

      <div className="divide-y divide-gray-700 w-full">
        <div className={`${selectedFile && "pb-7"}  ${input && "space-y-2.5"}`}>
          <textarea
            placeholder="what's happening"
            rows="2"
            value={input}
            maxLength="280"
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent min-h-[50px] w-full tracking-wide text-[#d9d9d9] outline-none text-lg placeholder-gray-500"
          />

          {selectedFile && (
            <div className="relative">
              <div
                className="abosolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26]
            bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 
            cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        { !loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  onChange={addImageToPost}
                />
              </div>
              <div className="icon rotate-90">
                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              )}
            </div>
            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
