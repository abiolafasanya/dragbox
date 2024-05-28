import { Input } from "@/components/ui/input";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";


const TagsInput: React.FC<{ setValue: (val: string[]) => void }> = ({
  setValue,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Check if the input value is already in the tags array to prevent duplicates
    if (!tags.includes(e.target.value)) {
      const newTag = [...tags, e.target.value];
      const unique = new Set(newTag);
      setValue([...unique]);
      // Update your state or perform other actions with the 'unique' array
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag) {
        setTags([...tags, newTag]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Input
        type="text"
        placeholder="Add tags..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      {tags.map((tag) => (
        <div
          key={tag}
          className="bg-slate-100 flex gap-2 text-sm rounded py-1 px-2"
        >
          {tag}
          <button className="text-black-500" onClick={() => removeTag(tag)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default TagsInput;
