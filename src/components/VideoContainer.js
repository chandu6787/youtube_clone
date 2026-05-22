import { useEffect, useState } from "react";
import { Youtube_Api_Url } from "../utils/constants";
import VideoCard from "./VideoCard";
const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  if (videos.length > 0) console.log(videos[0]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(Youtube_Api_Url);
      const json = await data.json();
      console.log(json);
      setVideos(json.items);
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
      {videos.map((video) => (
        <VideoCard info={video} key={video.id} />
      ))}
    </div>
  );
};

export default VideoContainer;
