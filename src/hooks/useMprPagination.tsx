import { useEffect, useState } from "react";
import { MprType } from "../types/mpr.type";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { db } from "../firebase/config";

export type QueryResult = {
  mprs: MprType[];
  currentPage: number;
  totalPages: number;
};

export const useMprPagination = (): QueryResult => {
  const [mprs, setMprs] = useState<MprType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMprs = async (
    page = 1,
    startAfterValue: DocumentData | null = null
  ) => {
    try {
      const collectionRef = collection(db, "mprs");
      let queryRef = query(collectionRef, orderBy("date"), limit(20));

      if (startAfterValue) {
        queryRef = query(queryRef, startAfter(startAfterValue));
      }

      const documentSnapshots = await getDocs(queryRef);
      const data = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MprType[];
      setMprs(data);
      setCurrentPage(page);
      console.log("total pages math", Math.ceil(documentSnapshots.size / 20));

      setTotalPages(Math.ceil(documentSnapshots.size / 20));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMprs();
  }, []);

  return { mprs, currentPage, totalPages };
};
