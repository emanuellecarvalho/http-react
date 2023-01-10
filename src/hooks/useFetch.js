import { useState, useEffect } from "react";

  // 4 - custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // 5 - refatorando o post
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  // 6 - loading
  const [loading, setLoading] = useState(false);

  // 7 - tratando erro
  const [error, setError] = useState(null);

  // 9 - desafio
  const [itemId, setItemId] = useState(null);

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

    } else if(method === "DELETE") {
      setConfig({
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
      });

      setMethod("DELETE");     
      setItemId(data); 
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      // 6 - loading
      setLoading(true);
      try {
        const res = await fetch(url);

        const json = await res.json();
  
        setData(json);

        setMethod(null);

        // 8 - tratando erros
        setError(null);

      } catch (error) {
        console.log(error.message);

        setError("Erro ao carregar os dados. Tente novamente!")
      }
      setLoading(false);
    }
    fetchData();
  }, [url, callFetch]);

  // 5 - refatorando post
  useEffect(() => {
    
    const httpRequest = async () => {
      if(method === "POST") {
        setLoading(true);

        // 5 - refatorando post
        let fetchOptions = [url, config];
        
        const res = await fetch(...fetchOptions);
        
        const json = await res.json();
  
        setCallFetch(json);
        // 9 - desafio
      } else if (method === "DELETE") {
        // url de remoção
        const deleteUrl = `${url}/${itemId}`;

        const res = await fetch(deleteUrl, config);

        const json = await res.json();

        setCallFetch(json);
      }
    };

    httpRequest();

  // sempre que houver uma alteração na config, esse useEffect é chamado
  }, [config])

  console.log("config", config);

  return { data, httpConfig, loading, error };
};
