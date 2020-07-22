const Contact = () => (
  <section id="contact" className="text-gray-700 body-font relative">
    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 flex justify-center pt-24">
      Contact Me
    </h1>
    <div className="container px-5 py-12 mx-auto flex sm:flex-no-wrap flex-wrap pt-0">
      <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
        <iframe
          className="absolute inset-0"
          style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
          title="map"
          marginHeight="0"
          marginWidth="0"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Kothapet&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          width="100%"
          height="100%"
          frameBorder="0"
        />
        <div className="bg-white relative flex flex-wrap py-6">
          <div className="lg:w-1/2 px-6">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm">
              ADDRESS
            </h2>
            <p className="leading-relaxed">Hyderabad, TS India</p>
          </div>
          <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm">
              EMAIL
            </h2>
            <a
              href="mailto:hi@shubhamverma.me"
              className="text-indigo-500 leading-relaxed"
            >
              hi@shubhamverma.me
            </a>
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mt-4">
              PHONE
            </h2>
            <a href="tel:+918096625858">
              <p className="leading-relaxed">+91 80966 25858</p>
            </a>
          </div>
        </div>
      </div>
      <form
        id="contact-form"
        name="contact"
        method="POST"
        action="https://formspree.io/imshubhamverma.sv@gmail.com"
        className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
      >
        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
          Let&apos;s Chat
        </h2>
        <p className="leading-relaxed mb-5 text-gray-600">
          Have something to say?
        </p>
        <div className="form-group">
          <input
            className="form-input w-full bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
            placeholder="Name"
            type="text"
            name="Name"
            id="name"
          />
          <label htmlFor="name" className="form-label">
            Name
          </label>
        </div>
        <div className="form-group">
          <input
            className="form-input w-full bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
            placeholder="Email"
            type="email"
            name="Email"
            id="email"
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
        </div>
        <div className="form-group">
          <textarea
            className="form-input w-full bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-indigo-500 text-base px-4 py-2 mb-4 resize-none"
            placeholder="Message"
            name="Message"
            id="message"
          />
          <label htmlFor="message" className="form-label form-label-textarea">
            Message
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Send Message
        </button>
      </form>
    </div>

    <style jsx>
      {`
        .form-label {
          display: block;
          transform: translate(1em, -3em);
          transform-origin: 0 0;
          transition: all 0.3s;
          background-color: white;
          width: max-content;
        }
        .form-input {
          box-shadow: none;
          border-radius: none;
          transition: all 0.5s;
        }

        .form-input::placeholder {
          color: transparent;
        }

        .form-label-textarea {
          transform: translate(1em, -6em);
          transform-origin: 0 0;
          transition: all 0.3s;
        }

        .form-input:focus {
          box-shadow: none;
          outline: none;
        }

        .form-input:focus + .form-label,
        .form-input:not(:placeholder-shown) + .form-label {
          transform: translateY(-4.3em) scale(1);
        }

        .form-input:focus + .form-label-textarea,
        .form-input:not(:placeholder-shown) + .form-label-textarea {
          transform: translateY(-10em) scale(1);
        }
      `}
    </style>
  </section>
);

export default Contact;
