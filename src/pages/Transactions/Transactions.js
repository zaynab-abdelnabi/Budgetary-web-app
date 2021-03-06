import React, { Component } from "react";
import axios from "axios";
import { Cards } from "../../components/Card/Card";
import { AddButton } from "../../components/Buttons/Button";
import TransactionDetails from "../../components/TransactionDetails/TransactionDetails";
import { TransactionTable } from "../../components/TransactionTable/TransactionTable";
import AddTransaction from "../../components/Forms/AddTransaction";
import EditTransaction from "../../components/Forms/EditTransaction";
import * as alert from "../../components/Alerts/Alert";
import "./Transactions.css";
import LoadingComponent from "../../components/Loading/Loading";

export class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsView: false,
      addView: false,
      editView: false,
      transactions: [],
      transaction: {},
      type: "",
      pageNumber: 1,
      filterType: "all",
      loading: true,
      categories: {},
      error: "",
      incomeAmount: "",
      expenseAmount: "",
      totalAmount: "",
    };
  }

  componentDidMount() {
    this.getAllData();
    this.getIncome();
    this.getExpense();
  }

  getAllData = (pageNumber = 1, type = "all") => {
    this.setState({ pageNumber: pageNumber, filterType: type });
    if (type === "all") {
      try {
        axios
          .get(
            `https://financial-app-api.herokuapp.com/api/transactions/list?page=${pageNumber}`
          )
          .then((res) => {
            this.setState({ transactions: res.data.data, loading: false });
          })
          .catch((err) => console.log(err));
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        axios
          .get(
            `https://financial-app-api.herokuapp.com/api/transactions/list/${type}?page=${pageNumber}`
          )
          .then((res) => {
            this.setState({ transactions: res.data.data, loading: false });
          })
          .catch((err) => console.log(err));
      } catch (e) {
        console.log(e);
      }
    }
  };

  getIncome = async () => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/transactions/incomes`)
        .then((res) => {
          this.setState({ incomeAmount: res.data.data });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  getExpense = async () => {
    try {
      await axios
        .get(
          `https://financial-app-api.herokuapp.com/api/transactions/expenses`
        )
        .then((res) => {
          this.setState({ expenseAmount: res.data.data });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  getById = async (id) => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/transactions/${id}`)
        .then((res) => {
          this.setState({
            transaction: res.data.data,
            detailsView: true,
            addView: false,
            editView: false,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  addNew = async (data) => {
    if (data.date) {
      await axios
        .post(
          `https://financial-app-api.herokuapp.com/api/transactions/create/fixed`,
          data
        )
        .then((res) => {
          if (res.data.status === 401) {
            alert.error(res.data.message);
          } else {
            alert.success(res.data.message);
            this.setState({
              loading: true,
              incomeAmount: "",
              expenseAmount: "",
              totalAmount: "",
            });
            this.getAllData();
            this.getIncome();
            this.getExpense();
            this.getById(res.data.data.id);
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      await axios
        .post(
          `https://financial-app-api.herokuapp.com/api/transactions/create/recurring`,
          data
        )
        .then((res) => {
          if (res.data.status === 401) {
            alert.error(res.data.message);
            this.setState({
              error: res.data.message,
            });
          } else {
            alert.success(res.data.message);
            this.setState({
              loading: true,
              incomeAmount: "",
              expenseAmount: "",
              totalAmount: "",
            });
            this.getAllData();
            this.getIncome();
            this.getExpense();
            this.setState({
              detailsView: true,
              addView: false,
              transaction: res.data.data[res.data.data.length - 1],
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  editById = (data) => {
    if (this.state.type === "fixed") {
      this.editFixed(this.state.transaction.id, data);
    } else if (this.state.type === "future") {
      this.editFutureRecurring(this.state.transaction.recurring.id, data);
    } else if (this.state.type === "recurring") {
      this.editAllRecurring(this.state.transaction.recurring.id, data);
    }
  };

  editFixed = (id, data) => {
    axios
      .put(
        `https://financial-app-api.herokuapp.com/api/transactions/edit/fixed/${id}`,
        data
      )
      .then((res) => {
        if (res.data.status === 401) {
          alert.error(res.data.message);
        } else {
          alert.success(res.data.message);
          this.setState({
            loading: true,
            incomeAmount: "",
            expenseAmount: "",
            totalAmount: "",
          });
          this.getAllData(this.state.pageNumber, this.state.filterType);
          this.getIncome();
          this.getExpense();
          this.getById(res.data.data.id);
        }
      })
      .catch((err) => console.log(err));
  };

  editFutureRecurring = (id, data) => {
    axios
      .put(
        `https://financial-app-api.herokuapp.com/api/transactions/edit/recurring/${id}`,
        data
      )
      .then((res) => {
        if (res.data.status === 401) {
          alert.error(res.data.message);
        } else {
          alert.success(res.data.message);
          this.setState({
            loading: true,
            incomeAmount: "",
            expenseAmount: "",
            totalAmount: "",
          });
          this.getAllData(this.state.pageNumber, this.state.filterType);
          this.getIncome();
          this.getExpense();
          this.setState({
            detailsView: true,
            editView: false,
            transaction: res.data.data[0],
          });
        }
      })
      .catch((err) => console.log(err));
  };

  editAllRecurring = (id, data) => {
    axios
      .put(
        `https://financial-app-api.herokuapp.com/api/transactions/edit/allrecurring/${id}`,
        data
      )
      .then((res) => {
        if (res.data.status === 401) {
          alert.error(res.data.message);
        } else {
          alert.success(res.data.message);
          this.setState({
            loading: true,
            incomeAmount: "",
            expenseAmount: "",
            totalAmount: "",
          });
          this.getAllData();
          this.getIncome();
          this.getExpense();
          this.setState({
            detailsView: true,
            editView: false,
            transaction: res.data.data[res.data.data.length - 1],
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteById = (id, type) => {
    if (type === "fixed") {
      axios
        .delete(
          `https://financial-app-api.herokuapp.com/api/transactions/${id}`
        )
        .then((res) => {
          alert.success(res.data.message);
          this.setState({
            transactions: {},
            detailsView: false,
            loading: true,
            incomeAmount: "",
            expenseAmount: "",
            totalAmount: "",
          });
          this.getAllData(this.state.pageNumber, this.state.filterType);
          this.getIncome();
          this.getExpense();
        })
        .catch((err) => console.log(err));
    } else if (type === "recurring") {
      axios
        .delete(`https://financial-app-api.herokuapp.com/api/recurrings/${id}`)
        .then((res) => {
          alert.success(res.data.message);
          this.setState({
            transactions: {},
            detailsView: false,
            loading: true,
            incomeAmount: "",
            expenseAmount: "",
            totalAmount: "",
          });
          this.getAllData();
          this.getIncome();
          this.getExpense();
        })
        .catch((err) => console.log(err));
    }
  };

  getCategories = async () => {
    try {
      axios
        .get("https://financial-app-api.herokuapp.com/api/categories")
        .then((res) => {
          this.setState({
            categories: res.data.data,
            detailsView: false,
            addView: true,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  getCategoriesEdit = async (type) => {
    try {
      axios
        .get("https://financial-app-api.herokuapp.com/api/categories")
        .then((res) => {
          this.setState({
            categories: res.data.data,
            detailsView: false,
            editView: true,
            type: type,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <>
          <div className="page-heading">
            <h1>Transactions</h1>
            <AddButton
              title="Add Transaction"
              onClick={() => {
                this.getCategories();
              }}
            />
          </div>
          {this.state.incomeAmount && this.state.expenseAmount && (
            <Cards
              income={this.state.incomeAmount}
              expense={this.state.expenseAmount}
            />
          )}
          <div className="transaction_content">
            {this.state.transactions ? (
              <TransactionTable
                transactions={this.state.transactions}
                showDetails={(id) => {
                  this.getById(id);
                }}
                filter={this.state.filterType}
                onPaginate={(pageNumber, type) => {
                  this.setState({
                    transactions: null,
                    // loading: true,
                  });
                  this.getAllData(pageNumber, type);
                }}
              />
            ) : (
              <LoadingComponent />
            )}

            {this.state.detailsView && this.state.transaction && (
              <TransactionDetails
                onEdit={(id, type) => {
                  this.getCategoriesEdit(type);
                }}
                onDelete={(id, type) => this.deleteById(id, type)}
                data={this.state.transaction}
                close={() => this.setState({ detailsView: false })}
              />
            )}
            {this.state.editView && this.state.transaction && (
              <EditTransaction
                data={this.state.categories}
                transaction={this.state.transaction}
                type={this.state.type}
                onSubmit={(data) => this.editById(data)}
                close={() => this.setState({ editView: false })}
              />
            )}
            {this.state.addView && (
              <AddTransaction
                data={this.state.categories}
                onSubmit={(data) => this.addNew(data)}
                close={() => this.setState({ addView: false })}
              />
            )}
          </div>
        </>
      );
    }
  }
}

export default Transactions;
