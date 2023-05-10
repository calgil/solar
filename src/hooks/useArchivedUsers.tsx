// import { useEffect, useState } from "react";
// import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
// import { db } from "../firebase/config";
// import {
//   ApprenticeData,
//   getApprenticeData,
// } from "../firebase/mpr/getApprenticeData";
// import { fetchUserData } from "../firebase/users/fetchUserById";

// type QueryResult = {
//   apprenticeData: ApprenticeInfo[];
//   handleFilterChange: (status: string) => void;
// };

// export type ApprenticeInfo = {
//   data: ApprenticeData;
//   apprenticeId: string;
//   name: string;
//   status: string;
//   hasUnapprovedMpr: boolean;
// };

// export const useArchivedUsers = (): QueryResult => {
//   const [apprenticeData, setApprenticeData] = useState<ApprenticeInfo[]>([]);

//   const fetchApprenticeData = async (apprenticeIds: Set<string>) => {
//     const apprenticeDataPromise = Array.from(apprenticeIds).map(async (id) => {
//       const user = await fetchUserData(id);
//       const data = await getApprenticeData(id);
//       const apprenticeId = id;
//       const name = data.mprs[0].apprenticeName;
//       const status = user?.status;
//       const hasUnapprovedMpr = data.mprs.some(
//         (mpr) => !mpr.supervisorSignature
//       );
//       return {
//         apprenticeId,
//         name,
//         data,
//         status,
//         hasUnapprovedMpr,
//       } as ApprenticeInfo;
//     });
//     const data = await Promise.all(apprenticeDataPromise);
//     return data;
//   };

//   const getArchivedUsers = async (status: "archived" | "graduated") => {
//     try {
//       const usersCollection = collection(db, "users");

//       const usersQuery = query(
//         usersCollection,
//         where("status", "==", status),
//         orderBy("name")
//       );

//       const apprenticeSnapshot = await getDocs(usersQuery);

//       const apprenticeIds = new Set(
//         apprenticeSnapshot.docs.map((doc) => doc.id)
//       );

//       const apprenticeData = await fetchApprenticeData(apprenticeIds);
//       return apprenticeData;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Could not get archived Users");
//     }
//   };

//   const handleFilterChange = async (status: string) => {
//     if (status !== "archived" && status !== "graduated") {
//       return;
//     }
//     const data = await getArchivedUsers(status);
//     setApprenticeData(data);
//   };

//   const getInitData = async () => {
//     const data = await getArchivedUsers("archived");
//     setApprenticeData(data);
//   };

//   useEffect(() => {
//     getInitData();
//   }, []);

//   return { apprenticeData, handleFilterChange };
// };
