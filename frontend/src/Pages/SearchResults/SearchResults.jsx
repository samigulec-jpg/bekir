import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ searchData }) => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (searchData.length > 0 && query) {
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [searchData, query]);

  return (
    <div className="search-results">
      <h2>Arama Sonuçları</h2>
      <div className="results-list">
        {results.length > 0 ? (
          results.map(item => (
            <div key={item._id} className="result-item">
              <img src={process.env.PUBLIC_URL + item.image} alt="Haber Görseli" className="result-image" />
              <div className="result-content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <p className="result-date">{item.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Sonuç Bulunamadı</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
