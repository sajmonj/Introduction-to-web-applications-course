import { useState, useEffect } from 'react';
import './App.css';
import ProductList from './ProductList';

function App() {
  const [data, setData] = useState(null);
  const [pattern, setPattern] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [sortDirection, setSortDirection] = useState('original');
  const [originalOrder, setOriginalOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const jsonData = await response.json();
        setData(jsonData.products);
        setOriginalOrder([...jsonData.products]);
      } catch (error) {
        console.error('Fetching data error: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(()=> {
   if (data) {
      const filtered = data.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()));
      setFilteredData(filtered);
    }
  }, [data, filter]); 

  const handlePatternChange = (event) => {
    setPattern(event.target.value);
  };

  const handleFilterChange = () => {
    setFilter(pattern)
    if (data) {
      const filtered = data.filter(item => item.title.toLowerCase().includes(pattern.toLowerCase()));
      setFilteredData(filtered);
    }
  }

  const handleSortChange = () => {
    if (data) {
      if (sortDirection === 'desc') {
        setSortDirection('original');
        setFilteredData([...originalOrder]);
        handleFilterChange();
      } else {
        setSortDirection(sortDirection === 'original' ? 'asc' : 'desc');
        const sorted = filteredData.sort((a, b) => {
          const aValue = a.title.toLowerCase();
          const bValue = b.title.toLowerCase();
          return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue); 
        });
        setFilteredData([...sorted]);
      }
    }
  }

  const updateProductTitle = ( productId, newTitle ) => {
    setData((prevData) => {
      const updatedData = prevData.map((product) => 
        product.id === productId ? { ...product, ...newTitle } : product
      )
      return updatedData;
    });
  };


  return (
    <div>
      <h1 className='title'>List of products</h1>
      <div>
        <label>Filter products: </label>
        <input type="text" value={pattern} onChange={handlePatternChange} />
        <button onClick={handleFilterChange}>Filter</button>
      </div>
      <div>
        <button onClick={handleSortChange}>
          Sort by title {sortDirection !== 'original' && (sortDirection === 'asc' ? '▲' : '▼')}
        </button>
      </div>
      {filteredData ? <ProductList products={filteredData} onUpdateProduct={updateProductTitle}/> : <p>Loading data...</p>}
    </div>
  );
}

export default App;
