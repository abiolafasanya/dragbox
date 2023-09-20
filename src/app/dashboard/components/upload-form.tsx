'use client';
import { CldUploadButton } from 'next-cloudinary';
import useUpload from '../hooks/useUpload';

const UploadForm = () => {
  const { text, handleCloudinary } = useUpload();
  return (
    <div className='flex flex-col max-w-sm mx-auto py-5'>
      <div className='my-10'>
        <CldUploadButton
          onSuccess={handleCloudinary}
          uploadPreset='dragbox'
          className='border-2 w-full bg-stone-900 text-white py-3 px-5 mt-5 rounded-lg'
        >
          {text}
        </CldUploadButton>
      </div>
    </div>
  );
};

export default UploadForm;
