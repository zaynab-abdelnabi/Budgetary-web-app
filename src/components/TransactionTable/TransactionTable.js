import React from "react";
import Pagination from "react-js-pagination";
import { Card } from "../../components/Card/Card";
import { TransactionTableHead } from "../Head/Head";
import { TransactionItem } from "../Tables/Tables";
import "./TransactionTable.css";

export function TransactionTable(props) {
  const { data, current_page, per_page, total } = props.transactions;

  return (
    <Card class="table animate__slideInUp">
      <TransactionTableHead
        filter={props.filter}
        status={(type) => {
          props.onPaginate(1, type);
        }}
      />
      <div className="table-content">
        {data && data.map((transaction) => {
          return (
            <TransactionItem
              key={transaction.id}
              data={transaction}
              showItem={() => props.showDetails(transaction.id)}
            />
          );
        })}
      </div>
      <div className="table-footer-pagination">
        <Pagination
          totalItemsCount={total}
          activePage={current_page}
          itemsCountPerPage={per_page}
          onChange={(pageNumber) => props.onPaginate(pageNumber, props.filter)}
        />
      </div>
    </Card>
  );
}
