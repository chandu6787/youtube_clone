import { useEffect, useState } from "react";
import { Youtube_Api_Url, Youtube_Search_Url } from "../utils/constants";
import { useSearchParams } from "react-router-dom";
import VideoCard from "./VideoCard";
const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data, json;
        if (q) {
          // Search endpoint
          data = await fetch(Youtube_Search_Url(q));
          json = await data.json();
          // normalize items to match video list shape expected by VideoCard
          const items = (json.items || []).map((it) => ({
            id: it.id.videoId,
            snippet: it.snippet,
            statistics: { viewCount: 0 },
          }));
          setVideos(items);
        } else {
          data = await fetch(Youtube_Api_Url);
          json = await data.json();
          setVideos(json.items || []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [q]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
      {videos.map((video) => (
        <VideoCard info={video} key={video.id} />
      ))}
    </div>
  );
};

export default VideoContainer;
