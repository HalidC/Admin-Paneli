export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  altText?: string;
  createdAt: string;
}
