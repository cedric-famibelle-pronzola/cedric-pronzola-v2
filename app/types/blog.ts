export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  author: {
    name: string;
    url: string;
  };
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: {
    name: string;
    url: string;
  };
}
