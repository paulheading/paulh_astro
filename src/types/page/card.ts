interface color {
  name: string;
  text: string;
  fill: string;
}

interface label {
  id: string;
  name: string;
  color: color;
}

interface primaryColor {
  name: string;
  text: string;
  fill: string;
}

interface projectDetails {
  length: string;
  start: string;
  due: string;
  status: string;
}

interface local {
  summary: string;
  desc: string;
  labels: [string];
  primaryColor: primaryColor;
  sections: [string];
  pathname: string;
  url: string;
  filename: string;
  projectDetails: projectDetails;
}

interface card {
  id: string;
  closed: boolean;
  dueComplete: boolean;
  dateLastActivity: boolean;
  desc: string;
  due: string;
  labels: [label];
  name: string;
  url: string;
  local: local;
  marquee: string;
  hero: boolean;
  type: string;
  start: string;
}

export type { card, local, label }