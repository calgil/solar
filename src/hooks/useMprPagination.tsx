import { useEffect, useState } from "react";
import { MprType } from "../types/mpr.type";
import {
  collection,
  endAt,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
} from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { db } from "../firebase/config";

export type QueryResult = {
  mprs: MprType[];
  currentPage: number;
  totalPages: number;
  next: () => void;
  prev: () => void;
};

export const useMprPagination = (): QueryResult => {
  const [mprs, setMprs] = useState<MprType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastVisible, setLastVisible] = useState<DocumentData | undefined>(
    undefined
  );
  const [firstVisible, setFirstVisible] = useState<DocumentData | undefined>(
    undefined
  );

  const getTotalMprs = async (): Promise<number> => {
    const coll = collection(db, "mprs");
    const snapshot = await getCountFromServer(coll);
    return Number(snapshot.data().count);
  };

  const fetchMprs = async (page = 1) => {
    try {
      const collectionRef = collection(db, "mprs");
      const totalCount = await getTotalMprs();
      setTotalPages(Math.ceil(totalCount / 10));
      setCurrentPage(page);

      const queryRef = query(collectionRef, orderBy("date", "desc"), limit(10));

      const documentSnapshots = await getDocs(queryRef);
      const data = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MprType[];

      setMprs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const next = () => {
    if (currentPage < totalPages) {
      fetchMprs(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      fetchMprs(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchMprs();
  }, []);

  return { mprs, currentPage, totalPages, next, prev };
};
