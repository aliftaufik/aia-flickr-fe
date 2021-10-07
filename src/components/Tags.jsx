import { useCallback, useState } from "react/cjs/react.development";

export default function Tags({
  className,
  tagList = [],
  onTagListChanged,
  ...props
}) {
  const [inputText, setInputText] = useState("");

  const handleAddTag = useCallback(
    (e) => {
      if (e.type === "keyup" && e.key !== "Enter") return;
      if (!inputText) return;

      const newTagList = [...tagList, inputText];
      onTagListChanged(newTagList);

      setInputText("");
    },
    [inputText, tagList, onTagListChanged]
  );

  const handleRemoveTag = useCallback(
    (index) => {
      const newTagList = [...tagList];
      newTagList.splice(index, 1);
      onTagListChanged(newTagList);
    },
    [tagList, onTagListChanged]
  );

  return (
    <div className={"flex justify-center " + className} {...props}>
      <div className="flex flex-col max-w-screen-sm">
        <div className="flex flex-wrap">
          {tagList.map((tag, index) => (
            <button
              key={tag + "-" + index}
              className="rounded-full px-3 py-0.5 ring-1 transition-all ring-blue-700 hover:bg-blue-700 mr-2 mb-1 flex justify-center items-center group"
              onClick={handleRemoveTag}
            >
              <span className="group-hover:mr-1 group-hover:text-white">
                {tag}
              </span>
              <div className="rounded-full w-4 h-4 bg-red-600 text-xs hidden group-hover:flex justify-center items-center opacity-0 group-hover:opacity-100">
                <span className="-mt-0.5">x</span>
              </div>
            </button>
          ))}
        </div>
        <div className="flex space-x-3 mt-2">
          <input
            type="text"
            placeholder={'"Footbal Player"'}
            value={inputText}
            onInput={(e) => setInputText(e.target.value)}
            onKeyUp={handleAddTag}
            className="rounded px-4 py-2 ring-1 hover:ring-2 ring-blue-700 focus:outline-none"
          />
          <button
            onClick={handleAddTag}
            className="rounded px-4 py-2 ring-1 ring-blue-700 transition-colors hover:bg-blue-700 hover:text-white"
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  );
}
