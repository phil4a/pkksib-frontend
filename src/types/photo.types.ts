interface IPhotoFormat {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path?: string;
	size: number;
	width: number;
	height: number;
	sizeInBytes: number;
}

interface IPhotoFormats {
	large?: IPhotoFormat;
	small?: IPhotoFormat;
	medium?: IPhotoFormat;
	thumbnail?: IPhotoFormat;
}

export interface IPhoto {
	id: number;
	documentId: string;
	name: string;
	alternativeText?: string;
	caption?: string;
	width: number;
	height: number;
	formats: IPhotoFormats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl?: string;
	provider: string;
	provider_metadata?: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}
