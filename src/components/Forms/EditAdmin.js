import React, { useState } from "react";
import { Card } from "../Card/Card";
import { EditAdminHead } from "../Head/Head";
import { EditInfoForm, EditPasswordForm } from "./Form";
import { AiOutlineClose } from "react-icons/ai";

export default function EditAdmin(props) {
  const [editInfo, setEditInfo] = useState(true);
  // const [editAdminForm, setEditAdminForm] = useState(props.data);

  return (
    <>
      <Card class="table">
        <AiOutlineClose
          className="AiOutlineClose"
          onClick={() => props.close()}
        />
        <EditAdminHead
          active={editInfo ? true : false}
          status={() => setEditInfo(!editInfo)}
        />
        {editInfo ? (
          <EditInfoForm
            data={props.data}
            onSubmitHandler={(data) => props.onSubmitInfo(data)}
          />
        ) : (
          <EditPasswordForm
            data={props.data}
            onSubmitHandler={(data) => props.onSubmitPassword(data)}
          />
        )}
      </Card>
    </>
  );
}
