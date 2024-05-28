type ImageSource = {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
};

export type ImageDataFile = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: ImageSource;
  liked: boolean;
  alt: string;
};

export type UploadBodyType = {
  description: string;
  name: string;
};

export type UploadResponseType = {
  tags: string[];
  description: string;
  name: string;
  imageUrl: string;
  uploadedBy: string;
  createdAt: Date;
  uid: string;
};
