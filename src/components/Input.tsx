import { createSignal } from "solid-js";

export const Input = () => {
  const [text, setText] = createSignal("");
  const [summarized, setSummarized] = createSignal<string | undefined>();

  const handleSubmit = async () => {
    const res = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ text: text() }),
    });
    const data = await res.json();
    setSummarized(data.summarized);
  };

  return (
    <div class="flex flex-col gap-4 w-full">
      <textarea
        class="w-full border-2 border-black rounded-lg p-1"
        value={text()}
        onInput={(e) => setText(e.currentTarget.value)}
      />
      <button
        class="border-2 border-black p-1 rounded-lg"
        onClick={handleSubmit}
      >
        요약하기
      </button>
      {summarized() && (
        <pre class="w-full bg-slate-100 rounded-lg p-1">{summarized()}</pre>
      )}
    </div>
  );
};
