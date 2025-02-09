/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/ui/Loading";
import { fetchRelatedVideos } from "../../features/relatedVideos/relatedVideosSlice";
import RelatedVideoListItem from "./RelatedVideoListItem";

export default function RelatedVideoList({ currentVideoId, tags }) {
  const dispatch = useDispatch();
  const { relatedVideos, isLoading, isError, error } = useSelector(
    (state) => state.relatedVideos
  );

  useEffect(() => {
    dispatch(fetchRelatedVideos({ id: currentVideoId, tags }));
  }, [dispatch, currentVideoId, tags]);

  //deside what to render
  let content = null;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError)
    content = <div className="col-span-12">{error}</div>;

  if (!isLoading && !isError && relatedVideos?.length === 0) {
    content = <div className="col-span-12">No videos found!</div>;
  }

  if (!isLoading && !isError && relatedVideos?.length > 0) {
    content = relatedVideos.map((video) => (
      <RelatedVideoListItem key={video.id} video={video} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
