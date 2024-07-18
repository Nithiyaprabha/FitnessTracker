import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainerProfile = ({ trainerId }) => {
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await axios.get(`/api/getTrainer/${trainerId}`);
        setTrainer(response.data);
      } catch (error) {
        console.error('Error fetching trainer data:', error);
      }
    };

    fetchTrainer();
  }, [trainerId]);

  if (!trainer) {
    return <p>Loading...</p>;
  }

  return (
    <div className="trainer-profile">
      <h2>{trainer.name}</h2>
      <p>{trainer.bio}</p>
      <h3>Followers</h3>
      <ul>
        {trainer.followers.map((followerId) => (
          <li key={followerId}>{followerId}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrainerProfile;
