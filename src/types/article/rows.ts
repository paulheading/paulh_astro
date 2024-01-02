interface content {
  padding?: boolean;
  columns?: number;
}

interface rowProps {
  data: string;
  controls?: boolean;
  content?: content;
  style?: object;
}

interface cardProps {
  countWords?: boolean;
  index: number;
  card: object;
}

export type { content, rowProps, cardProps }