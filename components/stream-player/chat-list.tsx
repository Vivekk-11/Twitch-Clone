import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";

interface Props {
  isHidden: boolean;
  messages: ReceivedChatMessage[];
}

export const ChatList = ({ messages, isHidden }: Props) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground text-sm">
          {isHidden ? "Chat is disabled" : "Welcome to the chat"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse p-3 overflow-y-auto h-full">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};
