"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useScreenRecording } from "@/lib/hooks/useScreenRecording";
import { ICONS } from "@/constants";

const RecordScreen = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecording();

  // ✅ Fix stale video issue
  useEffect(() => {
    if (recordedVideoUrl && videoRef.current) {
      videoRef.current.src = recordedVideoUrl;
    }
  }, [recordedVideoUrl]);

  const closeModal = () => {
    resetRecording();
    setIsOpen(false);
  };

  const handleStart = async () => {
    try {
      await startRecording();
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const recordAgain = async () => {
    resetRecording();
    await startRecording();
  };

  const goToUpload = async () => {
    if (!recordedBlob) return;

    setIsProcessing(true);

    try {
      const url = URL.createObjectURL(recordedBlob);

      sessionStorage.setItem(
        "recordedVideo",
        JSON.stringify({
          url,
          name: "screen-recording.webm",
          type: recordedBlob.type,
          size: recordedBlob.size,
          duration: recordingDuration || 0,
        })
      );

      router.push("/upload");
      closeModal();
    } catch (err) {
      console.error("Error preparing upload:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="record">
      {/* ✅ Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="primary-btn flex items-center gap-2"
      >
        <Image src={ICONS.record} alt="record" width={16} height={16} />
        <span className="truncate">Record a video</span>
      </button>

      {isOpen && (
        <section className="dialog">
          {/* ✅ Overlay */}
          <div
            className="overlay-record"
            onClick={closeModal}
            role="button"
            tabIndex={0}
          />

          <div className="dialog-content">
            {/* ✅ Header */}
            <figure className="flex items-center justify-between">
              <h3>Screen Recording</h3>
              <button onClick={closeModal}>
                <Image src={ICONS.close} alt="Close" width={20} height={20} />
              </button>
            </figure>

            {/* ✅ Recording Area */}
            <section className="min-h-[200px] flex items-center justify-center">
              {isRecording ? (
                <article className="flex items-center gap-2 text-red-500">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span>Recording in progress...</span>
                </article>
              ) : recordedVideoUrl ? (
                <video
                  ref={videoRef}
                  controls
                  className="rounded-md max-h-60"
                />
              ) : (
                <p className="text-gray-500 text-sm">
                  Click record to start capturing your screen
                </p>
              )}
            </section>

            {/* ✅ Controls */}
            <div className="record-box flex gap-3 flex-wrap">
              {!isRecording && !recordedVideoUrl && (
                <button
                  onClick={handleStart}
                  className="record-start flex items-center gap-2"
                >
                  <Image
                    src={ICONS.record}
                    alt="record"
                    width={16}
                    height={16}
                  />
                  Record
                </button>
              )}

              {isRecording && (
                <button
                  onClick={stopRecording}
                  className="record-stop flex items-center gap-2"
                >
                  <Image
                    src={ICONS.record}
                    alt="stop"
                    width={16}
                    height={16}
                  />
                  Stop Recording
                </button>
              )}

              {recordedVideoUrl && (
                <>
                  <button
                    onClick={recordAgain}
                    className="record-again"
                  >
                    Record Again
                  </button>

                  <button
                    onClick={goToUpload}
                    disabled={isProcessing}
                    className="record-upload flex items-center gap-2 disabled:opacity-50"
                  >
                    <Image
                      src={ICONS.upload}
                      alt="Upload"
                      width={16}
                      height={16}
                    />
                    {isProcessing
                      ? "Preparing..."
                      : "Continue to Upload"}
                  </button>
                </>
              )}
            </div>

            {/* ✅ Duration */}
            {recordingDuration && (
              <p className="text-xs text-gray-500 mt-2">
                Duration: {Math.round(recordingDuration)} sec
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default RecordScreen;