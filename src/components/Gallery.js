import React, { useContext } from 'react';
import { ApiDataContext } from '../context/ApiDataContext';

function Gallery() {
  const [data, setData] = useContext(ApiDataContext);
  const { projects } = data;
  const { images } = projects;

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Master Cleanse Reliac Heirloom
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep jianbing selfies heirloom.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {projects.map((project) => (
            <div className="lg:w-1/3 sm:w-1/2 p-4">
              <div className="flex relative">
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  src="https://dummyimage.com/600x360"
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                    {project.name}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {project.displayName}
                  </h1>
                  <p className="leading-relaxed">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Nam corporis a laborum nostrum vel, accusantium quam
                    exercitationem aliquam perferendis odit veniam iste
                    obcaecati animi quas.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )
    </section>
  );
}

export default Gallery;
