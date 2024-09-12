import React from "react";
import styles from "./Dashboard.module.scss";
import Table from "./Table/Table";
import { users } from "../../data/users";

const Dashboard = () => {
  const tableSchema = [
    {
      field: "name",
      Label: "Name",
    },
    {
      field: "status",
      Label: "Status",
    },
    {
      field: "role",
      Label: "Role",
    },
    {
      field: "email",
      Label: "Email",
    },

    {
      field: "teams",
      Label: "Teams",
    },
    {
      field: "add",
      Label: "",
    },
    {
      field: "delete",
      Label: "",
    },
  ];

  const tabelData = users;
  return (
    <div className={styles.Dashboard}>
      <Table schema={tableSchema} users={users} />
    </div>
  );
};

export default Dashboard;
