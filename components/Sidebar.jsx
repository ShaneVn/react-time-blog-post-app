import React from "react";
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

function Sidebar() {
  return (
    <div
      className="flex-col hidden sm:flex items-center xl:items-start
  xl:w-[340px] p-2 fixed h-full  
  "
    >
      <div
        className="flex items-center justify-center w-14 h-14
    hoverAnimation p-0 xl:ml-24"
      >
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>

      {/* space-y-2.5  10px space between each of the children of this div  */}
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      <button
        className="hidden xl:inline text-white  w-56 h-[52px] ml-auto
         bg-[#1d9bf0]  rounded-full font-bold text-lg shadow-md hover:bg-[#1a8cd8] "
      >
        Tweet
      </button>

      <div
        className="mt-auto text-[#D9D9D9] xl:ml-auto xl:mr-5 flex hoverAnimation 
        items-center justify-center
      "
      >
        <img
          src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt=""
          className="w-10 h-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">firebase</h4>
          <p className="test-[#6e767d]">@fireb243</p>
        </div>

        <DotsHorizontalIcon className="h-5 ml-10 hidden xl:inline " />
      </div>
    </div>
  );
}

export default Sidebar;
