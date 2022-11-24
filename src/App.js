import { useState, useEffect } from 'react';
import './App.css';

  // 4 - custom hook
import { useFetch }  from './hooks/useFetch';

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  // 4 - custom hook
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1 - resgatando dados
/*   useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();
  
      setProducts(data);
    }

    fetchData();
  }, []); */

  // 2 - add produtos
  const handleSubmit = async (e) => {
    e.preventDefault()

    // objeto que envia os dados para o backend 
    const product = {
      name,
      price,
    };


    // faz o POST
    // const res = await fetch(url, {
    //   method: "POST", 
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   // transform js object to json format
    //   body: JSON.stringify(product),
    // });

    // // 3 - carregamento dinânmico using spread operator
    // const addedProduct = await res.json();
    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    // resetar os states nos inputs ao terminar de enviar os produtos para o sistema

    // 5 - refatorando post
    httpConfig(product, "POST");
    
    setName("");
    setPrice("");

  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* 6 - loading*/}
      {loading ? (<p>Carregando dados...</p>) : (
        <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - R$: {product.price}</li>
        ))}
      </ul>)}
      {error && <p>{error}</p>}
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label>
            Nome: 
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço: 
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/* 7- state de loading no POST */}
          {loading ? (
          <input type="submit" disabled value="Aguarde"/>
          ) : (
          <input type="submit" value="Criar"/>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
