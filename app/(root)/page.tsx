import {
  EmptyState,
  Pagination,
  SharedHeader,
  VideoCard,
} from "@/components";
import { getAllVideos } from "@/lib/actions/video";

// ✅ Proper type for search params
type PageProps = {
  searchParams?: {
    query?: string;
    filter?: string;
    page?: string;
  };
};

const Page = async ({ searchParams }: PageProps) => {
  // ✅ Safe destructuring with defaults
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "";
  const currentPage = Number(searchParams?.page) || 1;

  // ✅ Fetch data
  const { videos = [], pagination } = await getAllVideos(
    query,
    filter,
    currentPage
  );

  return (
    <main className="wrapper page">
      <SharedHeader subHeader="Public Library" title="All Videos" />

      {/* ✅ Video List */}
      {videos.length > 0 ? (
        <section className="video-grid">
          {videos.map(({ video, user }) => (
            <VideoCard
              key={video.id}
              id={video.videoId}
              title={video.title}
              thumbnail={video.thumbnailUrl}
              createdAt={video.createdAt}
              userImg={user?.image ?? ""}
              username={user?.name ?? "Guest"}
              views={video.views}
              visibility={video.visibility}
              duration={video.duration || 0} // ✅ fallback
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon="/assets/icons/video.svg"
          title="No Videos Found"
          description={
            query || filter
              ? "Try adjusting your search or filters."
              : "No videos available yet."
          }
        />
      )}

      {/* ✅ Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          queryString={query}
          filterString={filter}
        />
      )}
    </main>
  );
};

export default Page;