type LoadMoreButton = {
  hasMore: boolean;
  loadMore: (count: number) => void;
};

const LoadMoreButton = ({ hasMore, loadMore }: LoadMoreButton) => {
  return hasMore ? (
    <div className="flex flex-wrap w-full mb-12 flex-col items-center text-center">
      <button
        className="flex mx-auto  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        onClick={() => loadMore(3)}>
        Load More
      </button>
    </div>
  ) : null;
};

export default LoadMoreButton;
