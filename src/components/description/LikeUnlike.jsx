import { useDispatch, useSelector } from "react-redux";
import likeImage from "../../assets/like.svg";
import unlikeImage from "../../assets/unlike.svg";
import { updateVideo } from "../../features/video/videoSlice";

export default function LikeUnlike() {
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.video);
  let { likes, unlikes } = video || {};

  const handleIncrementLike = () => {
    dispatch(
      updateVideo({
        id: video?.id,
        data: {
          likes: (likes += 1),
        },
      })
    );
  };

  const handleDecrementLike = () => {
    dispatch(
      updateVideo({
        id: video?.id,
        data: {
          unlikes: (unlikes += 1),
        },
      })
    );
  };

  return (
    <div className="flex gap-10 w-48">
      <div className="flex gap-1 cursor-pointer" onClick={handleIncrementLike}>
        <div className="shrink-0">
          <img className="w-5 block" src={likeImage} alt="Like" />
        </div>
        <div className="text-sm leading-[1.7142857] text-slate-600">
          {likes}
        </div>
      </div>
      <div className="flex gap-1 cursor-pointer" onClick={handleDecrementLike}>
        <div className="shrink-0">
          <img className="w-5 block" src={unlikeImage} alt="Unlike" />
        </div>
        <div className="text-sm leading-[1.7142857] text-slate-600">
          {unlikes}
        </div>
      </div>
    </div>
  );
}
