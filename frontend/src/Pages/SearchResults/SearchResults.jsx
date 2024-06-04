import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
      <div className="news-list">
        {results.length > 0 ? (
          results.map(item => (
            <div key={item._id} className="news-item">
              <Link to={`/news/${item._id}`}>
                <img src={`http://localhost:5000/${item.image}`} alt="Haber Görseli" className="news-image" />
                <div className="news-content">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <p className="news-date">{new Date(item.date).toLocaleString()}</p>
                </div>
              </Link>
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
