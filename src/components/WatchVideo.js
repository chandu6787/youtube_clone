import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/configSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
const WatchVideo = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("v");
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  if (!id) {
    return (
      <div className="bg-red-500 flex justify-center p-5 m-1 items-center">
        <div>NO VIDEO ID PROVIDED</div>
      </div>
    );
  }

  
return (
  <div className="w-full">
    <div className="flex flex-col lg:flex-row w-full">
      <div className="w-full lg:w-[70%] p-3">
        <iframe
          className="w-full h-[250px] sm:h-[400px] lg:h-[560px]"
          src={"https://www.youtube.com/embed/" + id}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="w-full lg:w-[30%] p-2">
        <LiveChat />
      </div>
    </div>
    <CommentsContainer />
  </div>

  );
};

export default WatchVideo;
