import { useEffect, useRef, useState } from "react";
import "./ChatComponent.scss";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

interface Message {
  type: string;
  msg: string;
  user: string;
}
// To use this component the websocket server has to be
const ChatComponent = () => {
  const [userName, setUserName] = useState<string>("");
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected:");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data as string);
      console.log("got a reply!", dataFromServer);
      setMessages((oldMessages) => [...oldMessages, dataFromServer]);
    };
  }, [messages]);

  const onButtonClicked = (value: string) => {
    client.send(
      JSON.stringify({
        type: "message",
        msg: value,
        user: userName,
      })
    );
    console.log("Sending to server.");
  };

  return (
    <div>
      ChatComponent
      <div>{userName}</div>
      {isLogged ? (
        <>
          {messages.map((message, index) => {
            {
              console.log("message", message);
            }
            return (
              <p key={index}>
                message: {message.msg} from {message.user}
              </p>
            );
          })}
          <button onClick={() => onButtonClicked("Hey server, how are you?")}>
            Push to server
          </button>
        </>
      ) : (
        <>
          <input type="text" ref={inputRef} placeholder="type userName" />
          <button
            onClick={() => {
              setIsLogged(true);
              setUserName(inputRef?.current?.value || "");
            }}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default ChatComponent;
