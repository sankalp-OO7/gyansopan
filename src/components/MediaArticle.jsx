import React from "react";

const MediaArticle = ({ imageSrc, articleLink, title }) => {
  return (
    <div
      className="flex flex-row items-center justify-center p-2 border border-gray-200"
      style={{ minWidth: '300px', flexShrink: 0 }}
    >
      <div className="flex-none w-1/4 flex justify-center items-center p-1">
        {/* Image path directly from public/media/ */}
        <img
          src={imageSrc}
          alt="media logo"
          className="h-20 w-full object-contain"
        />
      </div>
      <div className="flex-grow w-3/4 flex justify-center items-center pl-2">
        <p className="text-sm uppercase font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          <a href={articleLink} target="_blank" rel="noreferrer" className="block">
            {title}
          </a>
        </p>
      </div>
    </div>
  );
};

export default MediaArticle;