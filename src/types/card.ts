interface color {
  name: string;
  text: string;
  fill: string;
}

interface label {
  name: string;
  color: color;
}

export type { label }