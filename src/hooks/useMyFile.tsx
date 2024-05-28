"use client";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import { useAuth } from "./auth";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "@/components/ui/use-toast";

type UploadTypeData = {
  name: string;
  tags: string[];
  description: string;
  collectionName: string;
  url?: string;
};

export const useMyFiles = () => {
  const { user } = useAuth();

  const [uploads, setUploads] = useState<DocumentData[]>([]);

  async function readFn(collectionName: string = "uploads") {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      if (doc?.data) {
        setUploads((prev) => [...prev, doc.data()]);
      }
    });
  }

  useEffect(() => {
    readFn();
  }, []);

  return {
    uploads,
    user,
  };
};
