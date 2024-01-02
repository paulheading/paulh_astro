interface content {
  columns?: number;
  padding?: boolean;
}

interface pageRow {
  class: string;
  data?: string;
  id?: string;
  style?: object;
}

export type { content, pageRow }