import React, { useState } from "react";
import { Card } from "../Card/Card";
import { TransactionFormHead } from "../Head/Head";
import { EditTransactionForm } from "../Forms/Form";
import { AiOutlineClose } from "react-icons/ai";

export default function EditTransaction(props) {
  const [showIncome, setShowIncome] = useState(
    props.transaction.category.type === "income"
  );

  const getByType = (arr, type) => {
    return arr.filter((category) => category.type === type);
  };

  return (
    <>
      <Card class="table animate__slideInRight">
        <AiOutlineClose
          className="AiOutlineClose"
          onClick={() => props.close()}
        />
        <TransactionFormHead
          active={showIncome ? true : false}
          status={() => setShowIncome(!showIncome)}
        />
        {showIncome ? (
          <EditTransactionForm
            type={props.type}
            transaction={props.transaction}
            onSubmitHandler={(data) => props.onSubmit(data)}
            categories={getByType(props.data, "income")}
          />
        ) : (
          <EditTransactionForm
            type={props.type}
            transaction={props.transaction}
            onSubmitHandler={(data) => props.onSubmit(data)}
            categories={getByType(props.data, "expense")}
          />
        )}
      </Card>
    </>
  );
}
