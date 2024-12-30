import { useState, useEffect, useCallback } from "react";

export const useInitData = <T>(
  url: string,
  queryObject?: Record<string, string>,
  transformData?: (data: T) => T
) => {
  const [data, setData] = useState<T | undefined>();

  const fetchData = useCallback(async () => {
    const baseUrl = window.location.origin;
    const urlWithParams = new URL(url, baseUrl);
    if (queryObject) {
      Object.keys(queryObject).forEach((key) => {
        urlWithParams.searchParams.append(key, queryObject[key]);
      });
    }

    const response = await fetch(String(urlWithParams));
    const result: { data: T; success: boolean } = await response.json();
    if (!result.success) {
      return;
    }

    setData(transformData?.(result.data) || result.data);
  }, [queryObject, transformData, url]);

  useEffect(() => {
    // const baseUrl = window.location.origin;
    // const urlWithParams = new URL(url, baseUrl);
    // if (queryObject) {
    //   Object.keys(queryObject).forEach((key) => {
    //     urlWithParams.searchParams.append(key, queryObject[key]);
    //   });
    // }

    // const fetchData = async () => {
    //   const response = await fetch(String(urlWithParams));
    //   const result: { data: T; success: boolean } = await response.json();
    //   if (!result.success) {
    //     return;
    //   }

    //   setData(transformData?.(result.data) || result.data);
    // };

    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};
