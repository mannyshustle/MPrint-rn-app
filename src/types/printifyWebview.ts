export interface BluePrint {
  id: string;
  title: string;
  brand: string;
  model: string;
  images: string[];
  providerId: number;
}

export interface PrintifyResults {
  blueprintId?: string;
  providerId?: string;
  imageUrls?: string[];
  height?: string;
  positionLeft?: string;
  positionTop?: string;
  rotate?: string;
  scale?: string;
  width?: string;
  className?: string;
  html?: string;
}

