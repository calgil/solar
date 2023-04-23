import { useEffect, useState } from "react";
import { MprType } from "../types/mpr.type";
import {
  collection,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { db } from "../firebase/config";

export type QueryResult = {
  mprs: MprType[];
  currentPage: number;
  totalPages: number;
  next: () => void;
  prev: () => void;
  filterByName: (name: string) => void;
  findSupervisorUnapproved: () => void;
  findAdminUnapproved: () => void;
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

  // const [filterName, setFilterName] = useState<string | undefined>(undefined);

  const getTotalMprs = async (filterName?: string): Promise<number> => {
    const collectionRef = collection(db, "mprs");
    let queryRef = query(collectionRef);
    if (filterName) {
      queryRef = query(
        collectionRef,
        where("apprenticeName", "==", filterName)
      );
    }
    const snapshot = await getCountFromServer(queryRef);
    return Number(snapshot.data().count);
  };

  const fetchMprs = async (
    page = 1,
    direction: "next" | "prev" = "next",
    referenceDoc?: DocumentData,
    filterName?: string,
    showUnapproved?: "supervisor" | "admin"
  ) => {
    try {
      const collectionRef = collection(db, "mprs");
      const totalCount = await getTotalMprs(filterName);
      setTotalPages(Math.ceil(totalCount / 10));
      setCurrentPage(page);

      let queryRef = query(collectionRef, orderBy("date", "desc"), limit(10));

      if (showUnapproved) {
        if (showUnapproved === "supervisor") {
          queryRef = query(
            collectionRef,
            orderBy("date", "desc"),
            where("supervisorSignature", "==", false),
            limit(10)
          );
        }
        if (showUnapproved === "admin") {
          queryRef = query(
            collectionRef,
            orderBy("date", "desc"),
            where("adminApproval", "==", false),
            limit(10)
          );
        }
      }

      if (filterName) {
        queryRef = query(
          collectionRef,
          where("apprenticeName", "==", filterName),
          orderBy("date", "desc"),
          limit(10)
        );
      }

      if (direction === "next" && referenceDoc) {
        queryRef = query(
          collectionRef,
          orderBy("date", "desc"),
          startAfter(referenceDoc),
          limit(10)
        );
      }

      if (direction === "prev" && referenceDoc) {
        queryRef = query(
          collectionRef,
          orderBy("date", "desc"),
          endBefore(referenceDoc),
          limitToLast(10)
        );
      }

      const documentSnapshots = await getDocs(queryRef);

      const data = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MprType[];
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      setFirstVisible(documentSnapshots.docs[0]);
      setMprs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const next = () => {
    if (currentPage < totalPages) {
      fetchMprs(currentPage + 1, "next", lastVisible);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      fetchMprs(currentPage - 1, "prev", firstVisible);
    }
  };

  const filterByName = (name: string) => {
    console.log("filter by name");
    fetchMprs(1, "next", undefined, name);
  };

  const findSupervisorUnapproved = () => {
    console.log("find unapproved");
    fetchMprs(currentPage, "next", undefined, undefined, "supervisor");
  };

  const findAdminUnapproved = () => {
    fetchMprs(currentPage, "next", undefined, undefined, "admin");
  };

  useEffect(() => {
    fetchMprs();
  }, []);

  return {
    mprs,
    currentPage,
    totalPages,
    next,
    prev,
    filterByName,
    findSupervisorUnapproved,
    findAdminUnapproved,
  };
};
