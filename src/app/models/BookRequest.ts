export interface BookRequest {
  title: string;
  authors: Array<String>;
  ISBN: string;
  description: string;
  file?: {
    imageURL: string;
  };
}
