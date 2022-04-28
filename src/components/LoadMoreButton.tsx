type LoadMoreButton = {
  hasMore: boolean;
  loadMore: (count: number) => void;
};

const LoadMoreButton = ({ hasMore, loadMore }: LoadMoreButton) => {
  return hasMore ? (
    <div className='mb-12 flex w-full flex-col flex-wrap items-center text-center'>
      <button
        className='mx-auto flex  rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none'
        onClick={() => loadMore(3)}>
        Load More
      </button>
    </div>
  ) : null;
};

export default LoadMoreButton;
