import React from 'react';

interface ImageUploadContextProps {
  itemImage?: string;
  setItemImage?: React.Dispatch<React.SetStateAction<string | undefined>>;
  isImageUploading?: boolean;
  setImageUploading?: (isUploading: boolean) => void;
}

const ImageUploadContext = React.createContext<ImageUploadContextProps>({});

export default ImageUploadContext;
