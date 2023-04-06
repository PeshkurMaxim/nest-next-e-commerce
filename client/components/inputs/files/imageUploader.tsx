import Image from 'next/image';
import React, { useRef, useState } from 'react';
import styles from './imageUploader.module.css';

interface Image {
  id: number;
  file: File;
}

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    const length = images.length;

    for (let i = 0; i < files.length; i++) {      
      const file = files[i];
      
      const newImage = {
        id: length + i + 1,
        file,
      };
      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  const handleDelete = (id: number) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const movedImage = newImages.splice(oldIndex, 1)[0];
      newImages.splice(newIndex, 0, movedImage);
      return newImages;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const length = images.length;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const newImage = {
          id: length + i + 1,
          file,
        };
        setImages((prevImages) => [...prevImages, newImage]);
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      className={styles.main_container}
    >
      <div onClick={handleClick} onDrop={handleDrop} className={styles.input_container}>
          <span>Перетащите или выберите файл</span>
          <input ref={inputRef} onDrop={handleDrop} className={styles.input} type="file" multiple onChange={handleInputChange} /> 
      </div>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <div
            key={image.id} 
            className={styles.grid_item}
            draggable
            onDragStart={() => {
              setDraggedIndex(index);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedIndex !== null) {
                const oldIndex = draggedIndex;
                const newIndex = index;
                handleSortEnd(oldIndex, newIndex);
                setDraggedIndex(null);
              }
            }}
          >
            <div className={styles.image_container}><Image width='150' height='150' src={URL.createObjectURL(image.file)} alt="uploaded" /></div>   
            <button className={styles.delete} onClick={() => handleDelete(image.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
