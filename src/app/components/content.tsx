import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UploadForm from './upload-form';
import Gallery from './dnd/gallery';

const Content = () => {
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
        <Gallery />
      </TabsContent>
    </Tabs>
  );
};

export default Content;
