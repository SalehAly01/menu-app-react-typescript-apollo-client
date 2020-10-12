import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DropzoneRootProps, useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';

import ImageUploadContext from 'menu/image-upload-context';
import { UPLOAD_ITEM_IMAGE } from 'menu/menu-queries-and-mutations';

const getBorderColor = (props: DropzoneRootProps) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }

  return '#eeeeee';
};

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border 0.24s ease-in-out',
    marginTop: 15,
  },
  thumbsContainer: {
    display: 'flex',
    marginTop: 16,
  },
  thumbStyle: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 200,
    height: 200,
    padding: 4,
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
  errorStyle: {
    color: '#c45e5e',
    fontSize: '0.75rem',
  },
});

interface UploadImageProps {
  itemImage?: string;
  setItemImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setImageUploading: (isUploading: boolean) => void;
}

const ImageUploader = () => {
  const classes = useStyles();

  const [preview, setPreview] = useState<string>();
  const [errors, setErrors] = useState<string>();
  const [uploadImage, { data, loading, error }] = useMutation(
    UPLOAD_ITEM_IMAGE
  );

  const { itemImage, setItemImage, setImageUploading } = useContext(
    ImageUploadContext
  );
  if (error) {
    setErrors(error.message);
  }

  useEffect(() => {
    if (itemImage) {
      setPreview(itemImage);
    }
  }, [itemImage]);

  useEffect(() => {
    if (data?.uploadImage?.Location && setItemImage) {
      setItemImage(data.uploadImage.Location);
    }
  }, [data, setItemImage]);

  useEffect(() => {
    if (setImageUploading) {
      setImageUploading(loading);
    }
  }, [loading, setImageUploading]);

  const onDrop = useCallback(
    async ([file]) => {
      if (file) {
        setPreview(URL.createObjectURL(file));
        uploadImage({ variables: { file } });
      } else {
        setErrors('Something went wrong. Check file type and size (max. 1 MB)');
      }
    },
    [uploadImage]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxSize: 1024000,
  });

  const rootProps = getRootProps({ isDragActive, isDragAccept, isDragReject });

  return (
    <div
      {...rootProps}
      className={classes.container}
      style={{ borderColor: getBorderColor(rootProps) }}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drop image here, or click to select the file</p>
      )}

      {preview && (
        <aside className={classes.thumbsContainer}>
          <div className={classes.thumbStyle}>
            <div className={classes.thumbInner}>
              <img src={preview} className={classes.img} alt="Preview" />
            </div>
          </div>
        </aside>
      )}

      {errors && <span className={classes.errorStyle}>{errors}</span>}
    </div>
  );
};

export default ImageUploader;
