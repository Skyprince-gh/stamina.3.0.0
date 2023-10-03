import React, { useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

export const ImageInsertionField: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({onDrop});

  const clearImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="relative">
      <div
        {...getRootProps()}
        className="w-40 h-40 border-2 border-gray-300 p-2 rounded-md cursor-pointer"
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <input {...getInputProps()} />
            <span>Click or drag & drop an image here</span>
          </div>
        )}
      </div>
      {selectedImage && (
        <button
          className="absolute top-0 right-0 mt-1 mr-1 p-1 text-red-500 hover:text-red-600 cursor-pointer"
          onClick={clearImage}
        >
          X
        </button>
      )}
    </div>
  );
};

export default ImageInsertionField;
