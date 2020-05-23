// import React, { createContext, useState } from 'react';

// export const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//   const [initialState, setInitialState] = useState({
//     basics: {
//       name: 'Shubham Verma',
//       picture: 'https://avatars3.githubusercontent.com/u/25576658?v=4',
//       label: 'Front End Developer',
//       headline: null,
//       summary: null,
//       website: 'shubhamverma.me',
//       blog: null,
//       yearsOfExperience: null,
//       id: '8d9d73ae-8df5-4096-a8be-f1330d4c6cd2',
//       username: 'ShubhamVerma1811',
//       karma: 11,
//       email: 'imshubhamverma.sv@gmail.com',
//       region: 'Hyderabad, TS',
//       location: {},
//       phone: '+91 8096625858',
//       followers: 1,
//       following: 0,
//       profiles: [
//         {
//           network: 'gitconnected',
//           username: 'ShubhamVerma1811',
//           url: 'https://gitconnected.com/ShubhamVerma1811',
//         },
//         {
//           network: 'GitHub',
//           username: 'ShubhamVerma1811',
//           url: 'https://github.com/ShubhamVerma1811',
//         },
//         {
//           network: 'LinkedIn',
//           url: 'https://linkedin.com/in/ShubhamVerma1811',
//           username: 'ShubhamVerma1811',
//         },
//       ],
//     },
//     skills: [
//       {
//         name: 'HTML',
//         level: 'Expert',
//         rating: 5,
//         yearsOfExperience: 2,
//         keywords: [],
//       },
//       {
//         name: 'CSS',
//         level: '',
//         rating: 0,
//         yearsOfExperience: null,
//         keywords: [],
//       },
//       {
//         name: 'SCSS',
//         level: '',
//         rating: 0,
//         yearsOfExperience: null,
//         keywords: [],
//       },
//       {
//         name: 'JavaScript',
//         level: '',
//         rating: 0,
//         yearsOfExperience: null,
//         keywords: [],
//       },
//       {
//         name: 'React',
//         level: '',
//         rating: 0,
//         yearsOfExperience: null,
//         keywords: [],
//       },
//       {
//         name: 'Python',
//         level: '',
//         rating: 0,
//         yearsOfExperience: null,
//         keywords: [],
//       },
//       {
//         name: 'Problem Solving',
//         level: '',
//         rating: 0,
//         yearsOfExperience: null,
//         keywords: [],
//       },
//       {
//         name: 'Algorithms',
//         level: '',
//         rating: 0,
//         yearsOfExperience: null,
//         keywords: [],
//       },
//       {
//         name: 'Data Structures',
//         level: '',
//         rating: 0,
//         yearsOfExperience: null,
//         keywords: [],
//       },
//     ],
//     projects: [
//       {
//         name: 'unsplash-react',
//         displayName: 'Unsplash-React',
//         summary: 'An Unspash Clone made using React',
//         website: 'https://shubhamverma.me/Unsplash-React',
//         githubUrl: 'https://github.com/ShubhamVerma1811/Unsplash-React',
//         primaryLanguage: 'JavaScript',
//         languages: ['JavaScript', 'CSS', 'HTML'],
//         libraries: ['React'],
//         images: [],
//         videos: [],
//       },
//       {
//         name: '7d7w',
//         displayName: '7D7W',
//         summary:
//           "This repo contains all the sites that I've made in the 7Days7Websites challenge",
//         website: 'https:/shubhamverma.me/7D7W',
//         githubUrl: 'https://github.com/ShubhamVerma1811/7D7W',
//         primaryLanguage: '',
//         languages: ['CSS', 'SCSS', 'HTML'],
//         libraries: [],
//         images: [],
//         videos: [],
//       },
//       {
//         name: 'moviesappreact',
//         displayName: 'MoviesAppReact',
//         summary: 'An app that displays currently popular movies.',
//         website: 'https://shubhamverma.me/MoviesAppReact',
//         githubUrl: 'https://github.com/ShubhamVerma1811/MoviesAppReact',
//         primaryLanguage: 'JavaScript',
//         languages: ['HTML', 'CSS', 'JavaScript'],
//         libraries: ['React'],
//         images: [],
//         videos: [],
//       },
//       {
//         name: 'insure',
//         displayName: 'Insure',
//         summary:
//           'Website that I made as a  part of the 7 Days 7 Websites challenge.',
//         website: 'https://shubhamverma.me/Insure',
//         githubUrl: 'https://github.com/ShubhamVerma1811/Insure',
//         primaryLanguage: 'CSS',
//         languages: ['SCSS', 'CSS', 'HTML'],
//         libraries: [],
//         images: [],
//         videos: [],
//       },
//     ],
//     work: [
//       {
//         company: 'Enjos',
//         position: 'Frontend Developer',
//         website: '',
//         location: 'Remote',
//         summary: '',
//         isCurrentRole: false,
//         startDate: '2019-10-01',
//         endDate: '2019-11-01',
//         start: {
//           year: 2019,
//           month: 10,
//         },
//         end: {
//           year: 2019,
//           month: 11,
//         },
//         highlights: [
//           'Worked on making Landing pages provided by the company.',
//           'Made a ToDo List app that used LocalStorage to store data.',
//         ],
//       },
//       {
//         company: 'Nestor Analytics',
//         position: 'Frontend Developer',
//         website: '',
//         location: 'Hyderabad',
//         summary: '',
//         isCurrentRole: false,
//         startDate: '2019-07-01',
//         endDate: '2019-08-01',
//         start: {
//           year: 2019,
//           month: 7,
//         },
//         end: {
//           year: 2019,
//           month: 8,
//         },
//         highlights: ['Trained on HTML/CSS/JS'],
//       },
//     ],
//     publications: [],
//     education: [
//       {
//         institution: 'Guru Nanak Institute of Technology',
//         area: 'Computer Science',
//         studyType: "Bachelor's in Technology",
//         website: '',
//         startDate: null,
//         endDate: '2021-05-01',
//         start: {
//           year: null,
//           month: 1,
//         },
//         end: {
//           year: 2021,
//           month: 5,
//         },
//         description: 'I studied Computer Science here.',
//         activities: '',
//         gpa: '6.6',
//         courses: [],
//       },
//     ],
//     volunteer: [],
//     awards: [],
//     languages: [],
//     interests: [],
//     references: [],
//   });

//   return(
//     <DataContext.Provider>
//       {children}
//     </DataContext.Provider>
//   );
// };
