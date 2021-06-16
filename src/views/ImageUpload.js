import React, { useEffect, useState } from 'react';
import { Input, Button, Spinner } from 'reactstrap';
import firebase from 'firebase/app';
import { getImages, postImages } from '../helpers/data';

const uploadFile = (file, locationPath = '/') => new Promise((resolve, reject) => {
  // Create a refrence to storage
  const storageRef = firebase.storage().ref();

  // Upload the file to the passed down path
  const uploadTask = storageRef.child(`${locationPath}`).put(file);

  // Register two observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', {
    error: reject,
    complete: () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(resolve);
    },
  });
});

export default function ImageUpload() {
  const [allImages, setAllImages] = useState([]);
  const [imageState, setImageState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateImages = () => {
    getImages().then((images) => {
      setAllImages(images);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    updateImages();
  }, []);

  const handleChange = (e) => setImageState(e.target.files[0]);

  const handleSubmit = () => {
    setIsLoading(true);
    uploadFile(imageState, `images/${new Date().getUTCMilliseconds()}`)
      .then((imageURL) => {
        postImages(imageURL).then(updateImages);
      });
  };

  return (
    <div>
      {isLoading && (<>
        Image Loading <Spinner color="primary" />
      </>)}
      <div className="d-flex flex-column justify-content-center">
        <h1>Image upload</h1>
        <div
          style={{
            height: '400px',
            width: '400px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            alignSelf: 'center',
            backgroundImage: `url(${imageState ? URL.createObjectURL(imageState) : 'https://i.stack.imgur.com/y9DpT.jpg'}`,
          }}
        ></div>
        <Input onChange={handleChange} type='file' accept='image/*'></Input>
        <Button onClick={handleSubmit} disabled={isLoading || !imageState}>
          Upload Image
        </Button>
      </div>
      <div className='d-flex flex-wrap'>
        {[...allImages].reverse().map(({ url }, i) => (
          <div
            key={i}
            style={{
              height: '250px',
              width: '250px',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              alignSelf: 'center',
              backgroundImage: `url(${url}`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
