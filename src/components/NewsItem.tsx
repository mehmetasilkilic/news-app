import React from "react";

interface NewsItemProps {
  article: {
    source: {
      id: null | string;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };
}

const NewsItem: React.FC<NewsItemProps> = ({ article }) => {
  const {
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
  } = article;

  return (
    <div className="bg-white rounded p-4 mb-4 shadow-md">
      <div className="mb-4">
        <img src={urlToImage} alt={title} className="w-full h-auto rounded" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-gray-500 mb-2">{`Author: ${author}`}</p>
      <p className="text-sm text-gray-500 mb-2">{`Source: ${source.name}`}</p>
      <p className="text-sm text-gray-500 mb-2">{`Published at: ${publishedAt}`}</p>
      <p className="text-gray-700">{content}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsItem;
