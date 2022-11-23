import { useState, useEffect } from "react";

  // 4 - custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // 5 - refatorando o post
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const httpConfig = (data, method) => {
    if(method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data),
      });
      setMethod("POST");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);

      const json = await res.json();

      setData(json);
    }

    fetchData();
  }, [url, callFetch]);

  // 5 - refatorando post
  useEffect(() => {
    
    const httpRequest = async () => {
      if(method === "POST") {

        // 5 - refatorando post
        let fetchOptions = [url, config];
        
        const res = await fetch(...fetchOptions);
        
        const json = await res.json();
  
        setCallFetch(json);
      }
    };

    httpRequest();

  // sempre que houver uma alteração na config, esse useEffect é chamado
  }, [config, method, url])

  return { data, httpConfig };
};
