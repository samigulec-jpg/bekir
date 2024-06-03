import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import haberImage from '../../Components/Assets/Haber.jpeg'; // doğru dosya yolu
import './SearchResults.css';

const SearchResults = ({ searchData }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (Array.isArray(searchData)) { // searchData'nın bir dizi olduğunu doğruluyoruz
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [query, searchData]);

  return (
    <div className="search-results">
      <h1>Arama Sonuçları</h1>
      {results.length > 0 ? (
        <div className="news-list">
          {results.map(result => (
            <div key={result._id} className="news-item">
              <img src={haberImage} alt="Haber Görseli" className="news-image" />
              <div className="news-content">
                <h3>{result.title}</h3>
                <p>{result.content}</p>
                <p className="news-date">{result.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Sonuç bulunamadı.</p>
      )}
    </div>
  );
};

export default SearchResults;
