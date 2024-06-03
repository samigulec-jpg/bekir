import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './NewsDetail.css';
import likeIcon from '../../Components/Assets/like.png';
import favIcon from '../../Components/Assets/fav.png';
import editIcon from '../../Components/Assets/edit.png';
import deleteIcon from '../../Components/Assets/delete.png';
import Modal from '../../Components/Modal/Modal';

const NewsDetail = ({ isLoggedIn, username, setFavorites, favorites }) => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isFavored, setIsFavored] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalConfirmAction, setModalConfirmAction] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/news/${id}`);
        const data = response.data;
        setNewsItem(data);
        setIsFavored(favorites.some(fav => fav._id === data._id));
      } catch (error) {
        console.error('Haber yüklenemedi:', error);
      }
    };

    fetchNewsItem();
  }, [id, favorites]);

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
      setModalContent('Lütfen Giriş Yapınız');
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
      setModalContent('Lütfen Giriş Yapınız');
      setShowModal(true);
    }
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.text);
  };

  const handleDeleteClick = (commentId) => {
    setModalContent('Yorumu Silmek İstiyor Musunuz?');
    setModalConfirmAction(() => () => handleConfirmDelete(commentId));
    setShowModal(true);
  };

  const handleConfirmDelete = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalConfirmAction(null);
  };

  return (
    <div className="news-detail">
      <h1>{newsItem.title}</h1>
      <img src={`http://localhost:5000/${newsItem.image}`} alt="Haber Görseli" className="news-detail-image" />
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

      <Modal show={showModal} handleClose={handleCloseModal} handleConfirm={modalConfirmAction}>
        {modalContent}
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
                  <div className="comment-actions">
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="edit-icon"
                      onClick={() => handleEditClick(comment)}
                    />
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      className="delete-icon"
                      onClick={() => handleDeleteClick(comment.id)}
                    />
                  </div>
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
