export interface BluePrint {
  id: string;
  title: string;
  brand: string;
  model: string;
  images: string[];
  providerId: number;
}

export interface EditedProductResults {
  name?: string;
  printableId?: string;
  providerId?: string;
  mainImageUrl?: string;
  previewImageUrls?: string[];
  config: {
    height?: string;
    positionLeft?: string;
    positionTop?: string;
    rotate?: string;
    scale?: string;
    width?: string;
  };
}
