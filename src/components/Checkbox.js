import React, { useState } from "react";
import styles from "./Checkbox.module.scss";

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className={styles.CheckBox}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className={styles.CheckMark}></span>
    </label>
  );
};

export default Checkbox;
