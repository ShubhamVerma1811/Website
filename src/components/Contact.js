import React from 'react';

function Contact() {
  return (
    <section id="contact" className="text-gray-700 body-font relative">
      <div className="container px-5 py-24 mx-auto flex sm:flex-no-wrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            className="absolute inset-0"
            style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
            title="map"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
            width="100%"
            height="100%"
            frameBorder="0"
          />
          <div className="bg-white relative flex flex-wrap py-6">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm">
                ADDRESS
              </h2>
              <p className="leading-relaxed">
                Photo booth tattooed prism, portland taiyaki hoodie neutra
                typewriter
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm">
                EMAIL
              </h2>
              <a
                href="mailto:imshubamverma.sv@gmail.com"
                className="text-indigo-500 leading-relaxed"
              >
                imshubamverma.sv@gmail.com
              </a>
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">123-456-7890</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Feedback
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Post-ironic portland shabby chic echo park, banjo fashion axe
          </p>
          <input
            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
            placeholder="Name"
            type="text"
          />
          <input
            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
            placeholder="Email"
            type="email"
          />
          <textarea
            className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-indigo-500 text-base px-4 py-2 mb-4 resize-none"
            placeholder="Message"
          />
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Button
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Chicharrones blog helvetica normcore iceland tousled brook viral
            artisan.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
