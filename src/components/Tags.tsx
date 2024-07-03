import React from "react";

interface TagsProps {
    tags: string[];
  }

const Tags: React.FC<TagsProps> = ({ tags }) => {
    return (
        <div className="bg-white/40 py-4 px-3 rounded-3xl w-[95%] max-h-120 backdrop-blur-xl">
            <h4 className="text-md">Tags</h4>
            <div className="flex flex-wrap mt-2">
                {tags.map((tag) => (
                    <div
                        key={tag}
                        className="mr-2 mb-2 rounded-full text-blue-700 text-xs p-2 bg-white/45"
                    >
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tags;
