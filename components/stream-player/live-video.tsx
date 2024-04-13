import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useRef } from "react";
import { FullScreenControl } from "./fullscreen-control";

interface Props {
  participant: Participant;
}

export const LiveVideo = ({ participant }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef?.current);
      }
    });

  return (
    <div ref={wrapperRef} className="h-full relative flex">
      <video ref={videoRef} width="100%" src="" />
      <div className="absolute top-0 w-full h-full opacity-0 hover:opacity-100 transition-all">
        <div className="absolute bottom-0 flex w-full h-14 items-center justify-between bg-gradient-to- from-neutral-900 px-4">
          <FullScreenControl isFullscreen={false} onToggle={() => {}} />
        </div>
      </div>
    </div>
  );
};
