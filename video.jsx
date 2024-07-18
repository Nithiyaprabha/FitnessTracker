
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrainerVideo = () => {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: '', file: null });
  const [error, setError] = useState('');
  const [trainerId, setTrainerId] = useState(null);

  useEffect(() => {
    fetchTrainerId();
    fetchVideos();
  }, []);

  const fetchTrainerId = async () => {
    try {
      const response = await axios.get('https://fitnessbackend-10wn.onrender.com/getTrainerId');
      setTrainerId(response.data.trainerId);
    } catch (err) {
      console.error('Error fetching trainer ID:', err);
      setError('Failed to fetch trainer ID');
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://fitnessbackend-10wn.onrender.com/getVideos');
      setVideos(response.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to fetch videos');
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'file') {
      setNewVideo({ ...newVideo, file: e.target.files[0] });
    } else {
      setNewVideo({ ...newVideo, [e.target.name]: e.target.value });
    }
  };

  const handleUpload = async () => {
    if (!trainerId) {
      toast.error('Trainer ID not found');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newVideo.title);
      formData.append('video', newVideo.file);
      formData.append('trainerId', trainerId);

      const response = await axios.post('https://fitnessbackend-10wn.onrender.com/uploadVideo', formData);
      if (response.status === 200) {
        const data = response.data;
        setVideos([...videos, data]);
        toast.success('Video uploaded successfully');
      } else {
        toast.error('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload video');
    }
  };

  const handleDelete = async (videoUrl) => {
    try {
      await axios.delete('https://fitnessbackend-10wn.onrender.com/deleteVideo', {
        params: { url: videoUrl },
      });
      setVideos(videos.filter((video) => video.url !== videoUrl));
      toast.success('Video deleted successfully');
    } catch (error) {
      console.error('Error deleting video:', error);
      toast.error('Failed to delete video');
    }
  };

  return (
    <div className="trainer-video-page">
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/trainervideos">Videos</a></li>
          <li><a href="/trainerdiet">Diets</a></li>
          <li><a href="/trainerworkout">Workouts</a></li>
          <li className="logout-btn">
            <button onClick={() => {
              localStorage.removeItem('authToken');
              window.location.href = '/login';
            }}>Logout</button>
          </li>
        </ul>
      </nav>
      <div className="container">
        <h1>Upload Video</h1>
        {error && <p>{error}</p>}
        <div className="video-form">
          <input
            type="text"
            name="title"
            value={newVideo.title}
            onChange={handleInputChange}
            placeholder="Video Title"
          />
          <input
            type="file"
            name="file"
            onChange={handleInputChange}
          />
          <button onClick={handleUpload}>Upload Video</button>
        </div>
        <div className="video-list">
          {Array.isArray(videos) && videos.map((video) => (
            <div key={video._id} className="video-card">
              <h3>{video.title}</h3>
              <video controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={() => handleDelete(video.url)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
      <style>{`
        .trainer-video-page {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          margin: 0 auto;
          width: 100%;
        }
        .navbar {
          background-color: #333;
          padding: 10px;
        }
        .navbar ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar li {
          margin-right: 15px;
        }
        .navbar li:last-child {
          margin-right: 0;
        }
        .navbar a, .navbar button {
          color: #fff;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          padding: 5px 15px;
          transition: background 0.3s;
        }
        .navbar a:hover, .navbar button:hover {
          background-color: #555;
          border-radius: 5px;
        }
        .logout-btn {
          margin-left: auto;
        }
        .container {
          padding: 20px;
        }
        .video-form {
          margin-bottom: 20px;
        }
        .video-form input, .video-form button {
          display: block;
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .video-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .video-card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: calc(33.333% - 20px);
        }
        .video-card h3 {
          margin-top: 0;
        }
        .video-card video {
          width: 100%;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .video-card button {
          padding: 10px 15px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        .video-card button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default TrainerVideo;
