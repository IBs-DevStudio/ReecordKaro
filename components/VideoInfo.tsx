"use client";

import { cn, parseTranscript } from "@/lib/utils";
import { useState, useMemo } from "react";
import EmptyState from "./EmptyState";
import { infos } from "@/constants";

const VideoInfo = ({
  transcript,
  createdAt,
  description,
  videoId,
  videoUrl,
  title,
}: VideoInfoProps) => {
  const [info, setInfo] = useState<"transcript" | "metadata">("transcript");

  // ✅ Memoize expensive parsing
  const parsedTranscript = useMemo(
    () => parseTranscript(transcript || ""),
    [transcript]
  );

  // ✅ Format date once
  const formattedDate = useMemo(
    () =>
      new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    [createdAt]
  );

  const renderTranscript = () => (
    <ul className="transcript flex flex-col gap-3">
      {parsedTranscript.length > 0 ? (
        parsedTranscript.map((item) => (
          <li key={`${item.time}-${item.text.slice(0, 10)}`}>
            <h2 className="text-sm font-medium text-gray-500">
              [{item.time}]
            </h2>
            <p className="text-sm">{item.text}</p>
          </li>
        ))
      ) : (
        <EmptyState
          icon="/assets/icons/copy.svg"
          title="No transcript available"
          description="This video doesn’t include any transcribed content!"
        />
      )}
    </ul>
  );

  const metaDatas = [
    {
      label: "Video title",
      value: `${title} • ${formattedDate}`,
    },
    {
      label: "Video description",
      value: description || "No description provided",
    },
    {
      label: "Video id",
      value: videoId,
    },
    {
      label: "Video url",
      value: videoUrl,
      isLink: true,
    },
  ];

  const renderMetadata = () => (
    <div className="metadata flex flex-col gap-3">
      {metaDatas.map(({ label, value, isLink }) => (
        <article key={label}>
          <h2 className="text-xs text-gray-500 uppercase">{label}</h2>

          {isLink ? (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm truncate hover:underline"
            >
              {value}
            </a>
          ) : (
            <p className="text-sm break-words">{value}</p>
          )}
        </article>
      ))}
    </div>
  );

  return (
    <section className="video-info flex flex-col gap-4">
      {/* ✅ Tabs */}
      <nav className="flex gap-4 border-b">
        {infos.map((item) => (
          <button
            key={item}
            onClick={() => setInfo(item as "transcript" | "metadata")}
            className={cn(
              "pb-2 text-sm transition",
              info === item
                ? "text-pink-500 border-b-2 border-pink-500"
                : "text-gray-500 hover:text-black"
            )}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* ✅ Content */}
      {info === "transcript" ? renderTranscript() : renderMetadata()}
    </section>
  );
};

export default VideoInfo;