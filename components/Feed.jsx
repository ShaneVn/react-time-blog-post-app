import { SparklesIcon } from "@heroicons/react/outline";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import Input from "./Input";
import Post from "./Post";
import { db } from "../firebase";

function Feed() {
  const [posts, setPosts] = useState([]);



  

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),  
    [db]
  );

  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-2xl 
    sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between 
      py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h1 className="  text-lg sm:text-xl font-bold">Home</h1>

        <SparklesIcon className="h-5 text-white" />
      </div>

      <Input />
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
