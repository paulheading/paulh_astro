interface item {
  state: string;
  title: string;
}

interface props {
  items?: [item];
}

export type { item, props }