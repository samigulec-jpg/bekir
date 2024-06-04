import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './NewsDetail.css';
import likeIcon from '../../Components/Assets/like.png';
import favIcon from '../../Components/Assets/fav.png';
import deleteFavIcon from '../../Components/Assets/deletefav.png';
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
        setIsFavored(favorites.some(fav => fav.newsId && fav.newsId._id === data._id));
        const commentsResponse = await axios.get(`http://localhost:5000/api/comments/${id}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Haber veya yorumlar yüklenemedi:', error);
      }
    };

    fetchNewsItem();
  }, [id, favorites]);

  if (!newsItem) {
    return <p>Haber bulunamadı</p>;
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setModalContent('Lütfen giriş yapınız.');
      setShowModal(true);
      return;
    }
    if (editingCommentId) {
      try {
        const response = await axios.patch(`http://localhost:5000/api/comments/${editingCommentId}`, {
          text: editingCommentText
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const updatedComment = response.data;
        const updatedComments = comments.map(comment => 
          comment._id === updatedComment._id ? updatedComment : comment
        );
        setComments(updatedComments);
        setEditingCommentId(null);
        setEditingCommentText('');
      } catch (error) {
        console.error('Yorum güncellenemedi:', error);
        setModalContent('Yorum güncellenemedi. Lütfen tekrar deneyin.');
        setShowModal(true);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/comments', {
          text: commentText,
          postId: id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const newComment = response.data;
        setComments([...comments, newComment]);
        setCommentText('');
      } catch (error) {
        console.error('Yorum eklenemedi:', error);
        setModalContent('Yorum eklenemedi. Lütfen tekrar deneyin.');
        setShowModal(true);
      }
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

  const handleFavClick = async () => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      if (favorites.some(fav => fav.newsId._id === newsItem._id)) {
        setModalContent('Haber Zaten Favorilerde');
        setShowModal(true);
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/api/favorites', {
          newsId: newsItem._id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites([...favorites, response.data]);
        setIsFavored(true);
        setModalContent('Haber favorilere eklendi');
        setShowModal(true);
      } catch (error) {
        console.error('Favori eklenemedi:', error);
        setModalContent('Favori eklenemedi. Lütfen tekrar deneyin.');
        setShowModal(true);
      }
    } else {
      setModalContent('Lütfen Giriş Yapınız');
      setShowModal(true);
    }
  };

  const handleRemoveFavClick = async () => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      try {
         await axios.post('http://localhost:5000/api/favorites/remove', {
          newsId: newsItem._id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(favorites.filter(fav => fav.newsId._id !== newsItem._id));
        setIsFavored(false);
        setModalContent('Haber favorilerden kaldırıldı');
        setShowModal(true);
      } catch (error) {
        console.error('Favori kaldırılamadı:', error);
        setModalContent('Favori kaldırılamadı. Lütfen tekrar deneyin.');
        setShowModal(true);
      }
    } else {
      setModalContent('Lütfen Giriş Yapınız');
      setShowModal(true);
    }
  };
  

  const handleEditClick = (comment) => {
    setEditingCommentId(comment._id);
    setEditingCommentText(comment.text);
  };

  const handleDeleteClick = (commentId) => {
    setModalContent('Yorumu Silmek İstiyor Musunuz?');
    setModalConfirmAction(() => () => handleConfirmDelete(commentId));
    setShowModal(true);
  };

  const handleConfirmDelete = async (commentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setModalContent('Lütfen giriş yapınız.');
      setShowModal(true);
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setComments(comments.filter(comment => comment._id !== commentId));
        setShowModal(false);
      } else {
        throw new Error('Silme işlemi başarısız oldu');
      }
    } catch (error) {
      console.error('Yorum silinemedi:', error);
      setModalContent('Yorum silinemedi. Lütfen tekrar deneyin.');
      setShowModal(true);
    }
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
        <div className="interaction-item" onClick={handleRemoveFavClick}>   
          <img
            src={deleteFavIcon}
            alt="Remove Favorite"
            className="icon"
          />
          <p>Remove Fav</p>
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
              <div key={comment._id} className="comment">
                <p><strong>{comment.userId.username}</strong></p>
                <p>{comment.text}</p>
                {comment.userId.username === username && (
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
                      onClick={() => handleDeleteClick(comment._id)}
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
