import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetail.css';
import likeIcon from '../../Components/Assets/like.png';
import favIcon from '../../Components/Assets/fav.png';
import editIcon from '../../Components/Assets/edit.png';
import Modal from '../../Components/Modal/Modal';

const NewsDetail = ({ searchData, isLoggedIn, username, setFavorites, favorites }) => {
  const { id } = useParams();
  const newsItem = searchData.find(item => item._id === parseInt(id));

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isFavored, setIsFavored] = useState(favorites.some(fav => fav._id === newsItem._id));
  const [showModal, setShowModal] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  if (!newsItem) {
    return <p>Haber bulunamadı</p>;
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (editingCommentId) {
      const updatedComments = comments.map(comment => 
        comment.id === editingCommentId ? { ...comment, text: editingCommentText } : comment
      );
      setComments(updatedComments);
      setEditingCommentId(null);
      setEditingCommentText('');
    } else {
      const newComment = {
        id: comments.length + 1,
        text: commentText,
        username: username,
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const handleLikeClick = () => {
    if (isLoggedIn) {
      setIsLiked(!isLiked);
    } else {
      setShowModal(true);
    }
  };

  const handleFavClick = () => {
    if (isLoggedIn) {
      if (isFavored) {
        setFavorites(favorites.filter(fav => fav._id !== newsItem._id));
      } else {
        setFavorites([...favorites, newsItem]);
      }
      setIsFavored(!isFavored);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.text);
  };

  return (
    <div className="news-detail">
      <h1>{newsItem.title}</h1>
      <img src={newsItem.image} alt="Haber Görseli" className="news-detail-image" />
      <p>{newsItem.fullContent}</p>

      <div className="interactions">
        <div className="interaction-item" onClick={handleLikeClick}>
          <img
            src={likeIcon}
            alt="Like"
            className={`icon ${isLiked ? 'liked' : ''}`}
          />
          <p>Beğen</p>
        </div>
        <div className="interaction-item" onClick={handleFavClick}>
          <img
            src={favIcon}
            alt="Favorite"
            className={`icon ${isFavored ? 'favored' : ''}`}
          />
          <p>Fav</p>
        </div>
      </div>

      <Modal show={showModal} handleClose={handleCloseModal}>
        Lütfen Giriş Yapınız
      </Modal>

      <div className="comments-section">
        <h2>Yorumlar</h2>
        {isLoggedIn ? (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={editingCommentId ? editingCommentText : commentText}
              onChange={(e) => editingCommentId ? setEditingCommentText(e.target.value) : setCommentText(e.target.value)}
              placeholder="Yorumunuzu yazın..."
              required
            />
            <button type="submit">{editingCommentId ? 'Güncelle' : 'Yorum Ekle'}</button>
          </form>
        ) : (
          <p className="login-message">Yorum yapmak için lütfen giriş yapın.</p>
        )}
        
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p><strong>{comment.username}</strong></p>
                <p>{comment.text}</p>
                {comment.username === username && (
                  <img
                    src={editIcon}
                    alt="Edit"
                    className="edit-icon"
                    onClick={() => handleEditClick(comment)}
                  />
                )}
              </div>
            ))
          ) : (
            <p>Henüz yorum yapılmamış.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
