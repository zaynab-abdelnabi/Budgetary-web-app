import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import { LatestTransactionHead } from "../Head/Head";
import { LatestTransactionItem } from "../Tables/Tables";
import { Button } from "../Buttons/Button";
import "./LatestTransactions.css";

export function LatestTransaction(props) {
  return (
    <>
      <h2 className="Latest_transactions_text">Latest Transactions :</h2>
      <Card class="table latest_transactions">
        <LatestTransactionHead />
        <div className="table-content">
          {props.data.map((transaction) => (
            <LatestTransactionItem
              key={transaction.id}
              data={transaction}
            />
          ))}
        </div>
        <div className="see-more">
          <Link to="/transactions" className="btn-seemore">
            <Button class="btn-submit" title="see more ..." />
          </Link>
        </div>
      </Card>
    </>
  );
}
