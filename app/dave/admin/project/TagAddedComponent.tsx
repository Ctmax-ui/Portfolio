"use client";

import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagSelectorProps {
  tags:string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  onTagsChange: (tags: string[]) => void;
}

const TagAddedComponent: React.FC<TagSelectorProps> = ({ onTagsChange,tags,setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      onTagsChange(newTags);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className="w-full ">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
          >
            {tag}
            <span
              onClick={() => removeTag(tag)}
              className="ml-1 focus:outline-none cursor-pointer"
              aria-label={`Remove ${tag} tag`}
            >
              <X size={14} />
            </span>
          </span>
        ))}
      </div>
      <div className="w-full">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="px-5 py-4 w-full border border-slate-800 dark:border-slate-200 rounded-sm dark:bg-black"
          placeholder="Add tags (comma or enter to add)"
          aria-label="Add tags"
        />
      </div>
    </div>
  );
};

export default TagAddedComponent;
