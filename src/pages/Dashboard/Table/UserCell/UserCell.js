import React from "react";
import styles from "./UserCell.module.scss";

const UserCell = ({ avatar, name, username }) => {
  return (
    <div className={styles.UserCell}>
      <img src={avatar} />
      <div className={styles.Content}>
        <p className={styles.Name}>{name}</p>
        <p className={styles.Username}>{`@${username}`}</p>
      </div>
    </div>
  );
};

export default UserCell;
