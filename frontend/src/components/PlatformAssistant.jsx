import { useEffect, useRef, useState } from "react";
import { Bot, X } from "lucide-react";
import { askPlatformAssistant } from "../utils/api";

export default function PlatformAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! Ask me about Nexus, RAG, setup steps, or how the widget works.",
    },
  ]);

  const [pos, setPos] = useState({ x: null, y: null });
  const messagesEndRef = useRef(null);

  const dragRef = useRef({
    dragging: false,
    moved: false,
    offsetX: 0,
    offsetY: 0,
  });

  const btnRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.dragging) return;
      dragRef.current.moved = true;
      setPos({
        x: e.clientX - dragRef.current.offsetX,
        y: e.clientY - dragRef.current.offsetY,
      });
    };

    const onUp = () => {
      dragRef.current.dragging = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const onMouseDown = (e) => {
    if (open) return;
    const rect = btnRef.current.getBoundingClientRect();
    dragRef.current = {
      dragging: true,
      moved: false,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
  };

  const onClick = () => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    setOpen((prev) => !prev);
  };

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    try {
      const data = await askPlatformAssistant(question);
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I could not reach the assistant right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const positionStyle =
    pos.x !== null ? { left: pos.x, top: pos.y } : { right: 24, bottom: 24 };

  return (
    <div className="fixed z-50" style={positionStyle}>
      {open && (
        <div className="mb-3 w-[340px] h-[430px] bg-white border border-neutral-200 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b flex justify-between items-center bg-neutral-50">
            <div className="flex items-center gap-2">
              <Bot size={16} />
              <div>
                <p className="font-semibold text-sm">Nexus</p>
                <p className="text-xs text-neutral-500">Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-500 hover:text-black"
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 text-sm rounded-xl leading-relaxed ${
                    msg.role === "user"
                      ? "bg-black text-white"
                      : "bg-white border border-neutral-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-500">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t flex gap-2 bg-white">
            <input
              className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Ask about the platform..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-neutral-800 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        ref={btnRef}
        onMouseDown={onMouseDown}
        onClick={onClick}
        className="w-14 h-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center select-none hover:scale-105 transition font-semibold text-lg"
        title="Drag or click"
      >
        {open ? <X size={18} /> : "N"}
      </button>
    </div>
  );
}
