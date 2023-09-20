'use client';

import { toast } from '@/components/ui/use-toast';

export const handleCopyContent = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  copyText: string
) => {
  try {
    await navigator.clipboard.writeText(copyText);
    (e.target as HTMLButtonElement).innerText = 'Copied';
    toast({
      title: 'Image Copied',
    });
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
