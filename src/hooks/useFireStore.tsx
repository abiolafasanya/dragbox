"use client";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import { useAuth } from "./auth";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type UploadTypeData = {
  name: string;
  tags: string[];
  description: string;
  collectionName: string;
  url?: string;
};

export const useFireStore = ({reset}: {reset: () => void}) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploads, setUploads] = useState<DocumentData>();
  const router = useRouter()
  async function uploadFn({
    name,
    tags,
    description,
    url,
    collectionName = "uploads",
  }: UploadTypeData) {
    try {
      setUploading(true);
      const body = {
        name,
        tags,
        description,
        imageUrl: url,
        uploadedBy: user?.email,
        createdAt: new Date(Date.now()),
        uid: user?.uid,
      };
      const docRef = await addDoc(collection(db, collectionName), body);
      console.log("Document written with ID: ", docRef.id);
      if (docRef.id) {
        setUploading(false);
        toast({ description: "File upload was successful" });
        reset();
        router.push('/my-files')
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      setUploading(false);
      throw new Error("Upload failed, try again!");
    }
  }

  async function readFn(collectionName: string = "uploads") {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      setUploads(doc.data());
    });
  }

  async function handleUploadImage({
    url,
    name,
    description,
    tags,
    collectionName,
  }: UploadTypeData) {
    if (!user?.uid) {
      toast({
        description: "Only registered users can upload, login and try again!",
      });
      return;
    }
    if (!url) return;
    setUploading(true)

    const mimeTypeMatch = url?.match(
      /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
    );
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : null;

    if (!mimeType) return;

    const byteString = atob(url.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    // Create a blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: mimeType });

    // Generate a unique file ID
    const fileId = uuid();
    const fileExtension = mimeType.split("/")[1];

    try {
      const storageRef = ref(storage, `uploads/${fileId}.${fileExtension}`);

      // 'file' comes from the Blob or File API
      const uploadFile = await uploadBytes(storageRef, blob);
      const snapshot = uploadFile;
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        await uploadFn({
          name,
          collectionName,
          description,
          tags: tags,
          url: downloadURL,
        });
        // console.log("File available at", downloadURL);
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        setUploading(true);
        throw new Error(error.message);
      }
    }
  }
  return { uploadFn, readFn, uploads, handleUploadImage, uploading, setUploading };
};
