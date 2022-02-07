import React, { memo } from 'react';
import BackToTop from '../components/BackToTop';

const BlogLayout = (props: any) => {
  return (
    <div className="mt-20 lg:mt-36">
      {props.children}

      {/* <div>
        <p className="prose text-white">Found the post helpful?</p>

        <div className="flex flex-col text-white">
          <div className="flex flex-row">
            <span>Follow</span>
            <a className="prose mr-3 mb-3 border border-gray-700 px-3 py-2 text-white no-underline">
              @verma__shubham
            </a>
          </div>
        </div>
      </div> */}
      <BackToTop />
    </div>
  );
};

export default memo(BlogLayout);
