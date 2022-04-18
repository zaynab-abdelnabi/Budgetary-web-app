import React from "react";
import { Card } from "../Card/Card";
import { AddAdminHead } from "../Head/Head";
import { AddAdminForm } from "./Form";
import { AiOutlineClose } from "react-icons/ai";

function AddAdmin(props) {
  return (
    <>
      <Card class="table animate__slideInRight">
        <AiOutlineClose
          className="AiOutlineClose"
          onClick={() => props.close()}
        />
        <AddAdminHead />
        <AddAdminForm onSubmit={(data) => props.onSubmit(data)} />
      </Card>
    </>
  );
}

export default AddAdmin;
