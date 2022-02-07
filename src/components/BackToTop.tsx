import React from 'react';

const BackToTop = () => {
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return showBackToTop ? (
    <button
      className="border-text-white fixed right-5 bottom-5 h-12 w-12 rounded-full border bg-gray-900 text-white shadow"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}>
      Top
    </button>
  ) : null;
};

export default BackToTop;
