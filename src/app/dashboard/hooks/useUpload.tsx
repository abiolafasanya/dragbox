'use client';

import { CloudnaryResponse } from '@/types/cloudinaryResponse';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast"


const useUpload = () => {
  const { data: session } = useSession();
  const [upload, setUpload] = useState('');
  const [text, setText] = useState('Select Image to upload');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloudinary = async (e: any) => {
    setMessage('')
    setError(false);
    setSuccess(false);
    setText('');
    if (session && session.user) {
      const result: CloudnaryResponse = e as CloudnaryResponse;
      console.log(result);
      if (result) {
        setSuccess(true);
        setError(false);
        const { data, status } = await axios.post('/api/upload', {
          image: result.info.secure_url,
          email: session.user.email,
          tag: result.info.public_id,
          
        });
        if (status === 200) {
          setText('Uploaded');
          setMessage('File upload was successful')
          console.log(data);
          toast({
            title: "Image Uploaded",
            description: "You have updated your gallery",
          })
        }
      } else {
        setSuccess(false);
        setText('Upload Failed');
        setError(false);
        setUpload('');
      }
      setTimeout(() => {
        setSuccess(false);
        setText('Select a file to upload');
        setError(false);
      }, 5000);
    }
  };

  return {
    handleCloudinary,
    success,
    error,
    text,
    upload,
    message,
  };
};

export default useUpload;
