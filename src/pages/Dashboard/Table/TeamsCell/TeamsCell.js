import React, { useState } from "react";
import styles from "./TeamsCell.module.scss"; // Create a separate styles file for Teams

const Teams = ({ teams }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle expand/collapse of teams
  const toggleTeams = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.TeamsCell}>
      {/* Render the first two teams */}
      {teams.slice(0, 2).map((team) => (
        <p key={team} className={`${styles.TeamPill} ${styles[team]}`}>
          {team}
        </p>
      ))}

      {/* Show +X pill if there are more than 2 teams and it's not expanded */}
      {teams.length > 2 && !isExpanded && (
        <p
          className={`${styles.TeamPill} ${styles.Expander}`}
          onClick={toggleTeams}
        >
          +{teams.length - 2}
        </p>
      )}

      {/* Render remaining teams if expanded */}
      {isExpanded &&
        teams.slice(2).map((team) => (
          <p key={team} className={`${styles.TeamPill}  ${styles[team]}`}>
            {team}
          </p>
        ))}
    </div>
  );
};

export default Teams;
