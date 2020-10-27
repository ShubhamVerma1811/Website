const Contact = () => (
  <section
    className="text-gray-500 bg-gray-900 body-font relative"
    id="contact">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
          Contact Me
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Have something to say? Let's Chat!
        </p>
      </div>
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <div className="flex flex-wrap -m-2">
          <form
            action="https://formspree.io/imshubhamverma.sv@gmail.com"
            method="post"
            className="w-full">
            <div className="p-2">
              <input
                className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                placeholder="Name"
                type="text"
                name="NAME"
                required
              />
            </div>
            <div className="p-2">
              <input
                className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
                placeholder="Email"
                type="email"
                name="EMAIL"
                required
              />
            </div>
            <div className="p-2 w-full">
              <textarea
                name="MESSAGE"
                className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block"
                placeholder="Message"
                required></textarea>
            </div>
            <div className="p-2 w-full">
              <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg umami--click--form-send-msg">
                Send Message
              </button>
            </div>
          </form>
          <div className="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
            <a href="mailto:hi@shubhamverma.me" className="text-indigo-500">
              hi@shubhamverma.me
            </a>
            <p className="leading-normal my-5">
              Hyderabad
              <br />
              Telangana, India
            </p>
            <span className="inline-flex">
              <a
                href="https://linkedin.com/in/ShubhamVerma1811"
                class="ml-3 text-gray-600">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0"
                  class="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
              <a
                href="https://twitter.com/Shubham_Verma18"
                className="ml-4 text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a
                href="https://instagram.com/shubham.verma.me"
                className="ml-4 text-gray-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
