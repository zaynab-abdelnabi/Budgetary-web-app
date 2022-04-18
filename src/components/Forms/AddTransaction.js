import React, { useState } from "react";
import { Card } from "../Card/Card";
import { TransactionFormHead } from "../Head/Head";
import { AddTransactionForm } from "../Forms/Form";
import { AiOutlineClose } from "react-icons/ai";

export default function AddTransaction(props) {
  const [showIncome, setShowIncome] = useState(true);

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
          <AddTransactionForm
            onSubmitHandler={(data) => props.onSubmit(data)}
            categories={getByType(props.data, "income")}
          />
        ) : (
          <AddTransactionForm
            onSubmitHandler={(data) => props.onSubmit(data)}
            categories={getByType(props.data, "expense")}
          />
        )}
      </Card>
    </>
  );
}
