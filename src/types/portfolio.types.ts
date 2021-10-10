export interface ISkills {
  [key: string]: string;
}

export interface IPortfolio {
  basics: IBasics;
  skills: ISkills[];
  projects: IProject[];
  work: any[];
  publications: any[];
  education: IEducation[];
  volunteer: any[];
  awards: any[];
  languages: any[];
  interests: any[];
  references: any[];
  filteredPRIDs: string[];
}

export interface IBasics {
  name: string;
  picture: string;
  label: string;
  headline: string;
  summary: string;
  website: string;
  blog: string;
  id: string;
  username: string;
  email: string;
  region: string;
  location: Location;
  phone: string;
  followers: number;
  following: number;
  profiles: IProfile[];
}

export interface ILocation {
  [key: string]: any;
}

export interface IProfile {
  id: number;
  network: string;
  username: string;
  url: string;
}

export interface IEducation {
  institution: string;
  area: string;
  studyType: string;
  website: string;
  startDate: null;
  endDate: null;
  start: IEnd;
  end: IEnd;
  description: string;
  activities: string;
  gpa: string;
  courses: any[];
}

export interface IEnd {
  year: null;
  month: null;
}

export interface IProject {
  name: string;
  displayName: string;
  summary: string;
  website: string;
  githubUrl: string;
  primaryLanguage: string;
  languages: Language[];
  libraries: string[];
  images: IImage[];
  videos: any[];
}

export interface IImage {
  resolutions: IResolutions;
}

export interface IResolutions {
  micro: IDesktop;
  thumbnail: IDesktop;
  mobile: IDesktop;
  desktop: IDesktop;
}

export interface IDesktop {
  url: string;
  size: number;
  width: number;
  height: number;
}

export enum Language {
  CSS = 'CSS',
  HTML = 'HTML',
  JavaScript = 'JavaScript',
  Scss = 'SCSS',
}
