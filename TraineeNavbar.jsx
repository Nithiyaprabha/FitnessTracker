import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const TraineeNavbar = ({  handleLogout }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const traineeId = queryParams.get('traineeId');

  return (
    <nav className="navbar">
      <ul>
        <li><Link to={`/traineedashboard?traineeId=${traineeId}`}>Home</Link></li>
        <li><Link to={`/traineevideo?traineeId=${traineeId}`}>Videos</Link></li>
        <li><Link to={`/traineediet?traineeId=${traineeId}`}>Diets</Link></li>
        <li><Link to={`/traineeworkout?traineeId=${traineeId}`}>Workouts</Link></li>
      </ul>
      <div className="logout-btn">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <style>{`
        .navbar {
          background-color: #333;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .navbar ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
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
          margin-left: auto; /* Changed margin-right to margin-left */
        }
      `}</style>
    </nav>
  );
};

export default TraineeNavbar;
