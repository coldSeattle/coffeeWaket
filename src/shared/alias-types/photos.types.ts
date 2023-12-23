interface IPhotoItem {
  id: string;
  width: number;
  height: number;
  urls: UrlsType;
}

type UrlsType = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
};

type PageType = number;

export type { IPhotoItem, UrlsType, PageType };
