import React from "react";
import { Link } from "react-router-dom";
const VideoCard = ({ info }) => {
  if (!info) return null;
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <Link to={"/watch?v="+info.id}>
      <div className="w-full sm:w-72 p-2 m-2 shadow-lg rounded-lg">
      <img className="rounded-lg" src={thumbnails.medium.url} alt="thumbnail" />
      <ul>
        <li className="font-bold">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} views</li>
      </ul>
    </div>
    </Link>
  );
};

export default VideoCard;
