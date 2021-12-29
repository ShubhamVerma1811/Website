import { IBasics, ISkills } from '../types';
import React from 'react';

interface HeroProps {
  basics: IBasics;
  skills: ISkills[];
}

const Hero = ({ basics, skills }: HeroProps) => {
  if (typeof window !== 'undefined') {
    (function () {
      let js, q;
      const d = document,
        gi = d.getElementById,
        ce = d.createElement,
        gt = d.getElementsByTagName,
        id = 'typef_orm_share',
        b = 'https://embed.typeform.com/';
      if (!gi.call(d, id)) {
        js = ce.call(d, 'script');
        js.id = id;
        //@ts-expect-error Object might be null
        js.src = b + 'embed.js';
        q = gt.call(d, 'script')[0];
        //@ts-expect-error Object might be null
        q.parentNode.insertBefore(js, q);
      }
    })();
  }

  return (
    <section className="text-gray-500 bg-gray-900 body-font">
      <main>
        <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 flex justify-center">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={basics.picture}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Hi, I am {basics.name}
              <br />
              {basics.label.toUpperCase()}
            </h1>
            <p className="mb-8 leading-relaxed">{basics.summary}</p>
            <span className="mb-8">
              <h2 className="text-lg">My Skills include:</h2>
              <span className="flex flex-wrap items-center md:my-2 w-full">
                {skills.map((skill, index) => (
                  <p
                    key={index}
                    className="border-2 border-indigo-500 text-white rounded-lg px-3 py-1 m-1 hover:bg-indigo-500 cursor-pointer md:mb-2">
                    {skill}
                  </p>
                ))}
              </span>
            </span>
            <div className="flex justify-center">
              <a
                href="https://drive.google.com/file/d/1WL5bIjipkpulVW6a3gcwHgMGpvvU6IFq/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg umami--click--hero-view-resume">
                  View Resume
                </button>
              </a>
              <a
                href="https://form.typeform.com/to/KSbANS2c?typeform-medium=embed-snippet"
                data-mode="popup"
                className="typeform-share ml-4 inline-flex cursor-pointer text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg umami--click--hero-contact"
                data-size="100"
                target="_blank"
                rel="noreferrer">
                Contact
              </a>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Hero;
