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
    <section className="body-font bg-gray-900 text-gray-500">
      <main>
        <div className="container mx-auto flex flex-col items-center px-5 py-12 md:flex-row">
          <div className="mb-10 flex w-5/6 justify-center md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg">
            <img
              className="rounded object-cover object-center"
              alt="hero"
              src={basics.picture}
            />
          </div>
          <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:pl-16 md:text-left lg:flex-grow lg:pl-24">
            <h1 className="title-font mb-4 text-3xl font-medium text-white sm:text-4xl">
              Hi, I am {basics.name}
              <br />
              {basics.label.toUpperCase()}
            </h1>
            <p className="mb-8 leading-relaxed">{basics.summary}</p>
            <span className="mb-8">
              <h2 className="text-lg">My Skills include:</h2>
              <span className="flex w-full flex-wrap items-center md:my-2">
                {skills.map((skill, index) => (
                  <p
                    key={index}
                    className="m-1 cursor-pointer rounded-lg border-2 border-indigo-500 px-3 py-1 text-white hover:bg-indigo-500 md:mb-2">
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
                <button className="umami--click--hero-view-resume inline-flex rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none">
                  View Resume
                </button>
              </a>
              <a
                href="https://form.typeform.com/to/KSbANS2c?typeform-medium=embed-snippet"
                data-mode="popup"
                className="typeform-share umami--click--hero-contact ml-4 inline-flex cursor-pointer rounded border-0 bg-gray-800 py-2 px-6 text-lg text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
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
