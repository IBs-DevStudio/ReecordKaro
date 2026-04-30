"use client";

import { cn, createIframeLink } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  incrementVideoViews,
  getVideoProcessingStatus,
} from "@/lib/actions/video";
import { initialVideoState } from "@/constants";

const VideoPlayer = ({ videoId, className }: VideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [state, setState] = useState({
    ...initialVideoState,
    isError: false,
  });

  // ✅ Processing check with safe polling
  useEffect(() => {
    let isMounted = true;

    const checkProcessingStatus = async () => {
      try {
        const status = await getVideoProcessingStatus(videoId);

        if (!isMounted) return;

        setState((prev) => ({
          ...prev,
          isProcessing: !status.isProcessed,
        }));

        return status.isProcessed;
      } catch (err) {
        console.error("Error checking processing status:", err);
        if (isMounted) {
          setState((prev) => ({ ...prev, isError: true }));
        }
        return false;
      }
    };

    checkProcessingStatus();

    const intervalId = setInterval(async () => {
      const isProcessed = await checkProcessingStatus();
      if (isProcessed) clearInterval(intervalId);
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [videoId]);

  // ✅ Increment view (safe)
  useEffect(() => {
    if (!state.isLoaded || state.hasIncrementedView || state.isProcessing)
      return;

    const incrementView = async () => {
      try {
        await incrementVideoViews(videoId);
        setState((prev) => ({ ...prev, hasIncrementedView: true }));
      } catch (error) {
        console.error("Failed to increment view count:", error);
      }
    };

    incrementView();
  }, [videoId, state.isLoaded, state.hasIncrementedView, state.isProcessing]);

  return (
    <div className={cn("video-player relative", className)}>
      {/* ✅ Error State */}
      {state.isError ? (
        <div className="flex items-center justify-center h-60 text-red-500">
          Failed to load video. Please try again.
        </div>
      ) : state.isProcessing ? (
        /* ✅ Processing State */
        <div className="flex flex-col items-center justify-center h-60 gap-2 text-gray-500">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          <p>Processing video...</p>
        </div>
      ) : (
        <>
          {/* ✅ Loading Skeleton */}
          {!state.isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
            </div>
          )}

          {/* ✅ Video */}
          <iframe
            ref={iframeRef}
            src={createIframeLink(videoId)}
            loading="lazy"
            title="Video player"
            className="w-full h-[400px] rounded-md"
            style={{ border: 0 }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() =>
              setState((prev) => ({ ...prev, isLoaded: true }))
            }
          />
        </>
      )}
    </div>
  );
};

export default VideoPlayer;