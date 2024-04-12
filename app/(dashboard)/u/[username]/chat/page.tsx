import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import React from "react";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) throw new Error("Stream not found!");

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="font-bold text-2xl">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          label="Enable chat"
          value={stream.isChatEnabled}
          field="isChatEnabled"
        />
        <ToggleCard
          label="Delay chat"
          value={stream.isChatDelayed}
          field="isChatDelayed"
        />
        <ToggleCard
          label="Must be following to chat"
          value={stream.isChatFollowersOnly}
          field="isChatFollowersOnly"
        />
      </div>
    </div>
  );
};

export default ChatPage;
