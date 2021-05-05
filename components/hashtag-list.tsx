const HashtagList = ({ hashtags }) => (
  <div className="px-6 py-2">
    {hashtags.split(",").map((ht: string) => (
      <span
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        key={ht}
      >
        #{ht}
      </span>
    ))}
  </div>
);

export default HashtagList;
