import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UploadForm from './upload-form';
import Gallery from './gallery';
import { Upload } from '@prisma/client';

interface Props {
  images: Upload[]
}
const Content = ({images}: Props) => {
  return (
    <Tabs defaultValue='gallery' className='w-full'>
      <TabsList className='w-full flex max-w-sm mx-auto'>
        <TabsTrigger value='gallery' className='w-full'>
          Gallery
        </TabsTrigger>
        <TabsTrigger value='upload' className='w-full'>
          Upload
        </TabsTrigger>
      </TabsList>
      <TabsContent value='upload'>
        <UploadForm />
      </TabsContent>
      <TabsContent value='gallery'>
        <Gallery uploads={images} />
      </TabsContent>
    </Tabs>
  );
};

export default Content;
