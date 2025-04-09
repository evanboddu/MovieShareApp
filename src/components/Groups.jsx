import React, { useState } from 'react';
import './Groups.css'; // Add a CSS file for animations

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [movies, setMovies] = useState({}); // Store movies for each group

  const addGroup = () => {
    if (groupName.trim()) {
      setGroups([...groups, groupName]);
      setMovies({ ...movies, [groupName]: [] }); // Initialize movies for the new group
      setGroupName('');
    }
  };

  const addMovieToGroup = (group, movie) => {
    setMovies({
      ...movies,
      [group]: [...movies[group], movie],
    });
  };

  return (
    <div>
      {selectedGroup ? (
        <div className="group-details">
          <button onClick={() => setSelectedGroup(null)}>Back to Groups</button>
          <h2>{selectedGroup} - Movies</h2>
          <ul>
            {movies[selectedGroup].map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add a movie"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                addMovieToGroup(selectedGroup, e.target.value.trim());
                e.target.value = '';
              }
            }}
          />
        </div>
      ) : (
        <div className="group-list">
          <h2>Groups</h2>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
          <button onClick={addGroup}>Add Group</button>
          <ul>
            {groups.map((group, index) => (
              <li
                key={index}
                onClick={() => setSelectedGroup(group)}
                className="group-item"
              >
                {group}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Groups;
