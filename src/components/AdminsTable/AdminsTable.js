import React, { useState } from "react";
import { Card } from "../Card/Card";
import { AdminsTableHead } from "../Head/Head";
import { AdminItem } from "../Tables/Tables";
import "./AdminsTable.css";

export function AdminsTable(props) {
  const [admins, setAdmins] = useState(props.data);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    if (value) {
      const filtered = props.data.filter(
        (admin) => admin.name.includes(value) || admin.email.includes(value)
      );
      setAdmins(filtered);
    } else {
      setAdmins(props.data);
    }
  };

  return (
    <Card class="table animate__slideInUp">
      <AdminsTableHead onChange={onChangeHandler} />
      <div className="table-content">
        {admins.map((admin) => {
          return (
            <AdminItem
              key={admin.id}
              name={admin.name}
              email={admin.email}
              edit={() => props.edit(admin.id)}
              delete={() => props.delete(admin.id)}
            />
          );
        })}
      </div>
    </Card>
  );
}
