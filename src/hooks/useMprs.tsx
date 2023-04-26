import { useEffect, useState } from "react";
import { MprType } from "../types/mpr.type";

export const useMprs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mprs, setMprs] = useState<MprType[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
  });
};
