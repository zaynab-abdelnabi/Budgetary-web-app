import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "animate.css";
import { Cards } from "../../components/Card/Card";
import { AddButton } from "../../components/Buttons/Button";
import TransactionDetails from "../../components/TransactionDetails/TransactionDetails";
import { TransactionTable } from "../../components/TransactionTable/TransactionTable";
import AddTransaction from "../../components/Forms/AddTransaction";
import EditTransaction from "../../components/Forms/EditTransaction";
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
          .get(`http://127.0.0.1:8000/api/transactions/list?page=${pageNumber}`)
          .then((res) => {
            this.setState({ transactions: res.data.data, loading: false });
            // console.log(res.data.data);
          })
          .catch((err) => console.log(err));
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        axios
          .get(
            `http://127.0.0.1:8000/api/transactions/list/${type}?page=${pageNumber}`
          )
          .then((res) => {
            this.setState({ transactions: res.data.data, loading: false });
            // console.log(res.data.data);
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
        .get(`http://127.0.0.1:8000/api/transactions/incomes`)
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
        .get(`http://127.0.0.1:8000/api/transactions/expenses`)
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
        .get(`http://127.0.0.1:8000/api/transactions/${id}`)
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
    // console.log(data);
    if (data.date) {
      await axios
        .post(`http://127.0.0.1:8000/api/transactions/create/fixed`, data)
        .then((res) => {
          if (res.data.status === 401) {
            Swal.fire({
              icon: "error",
              title: `${res.data.message}`,
              showConfirmButton: true,
              confirmButtonText: "Ok",
              confirmButtonColor: "#f76928",
              showClass: {
                popup: "animate__animated animate__zoomIn",
              },
              hideClass: {
                popup: "animate__animated animate__zoomOut",
              },
              timer: 3000,
            });
          } else {
            Swal.fire({
              title: `${res.data.message}`,
              showConfirmButton: true,
              confirmButtonText: "Ok",
              confirmButtonColor: "#f76928",
              showClass: {
                popup: "animate__animated animate__zoomIn",
              },
              hideClass: {
                popup: "animate__animated animate__zoomOut",
              },
              timer: 3000,
            });
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
        .post(`http://127.0.0.1:8000/api/transactions/create/recurring`, data)
        .then((res) => {
          if (res.data.status === 401) {
            Swal.fire({
              icon: "error",
              title: `${res.data.message}`,
              showConfirmButton: true,
              confirmButtonText: "Ok",
              confirmButtonColor: "#f76928",
              showClass: {
                popup: "animate__animated animate__zoomIn",
              },
              hideClass: {
                popup: "animate__animated animate__zoomOut",
              },
              timer: 3000,
            });
            this.setState({
              error: res.data.message,
            });
          } else {
            Swal.fire({
              title: `${res.data.message}`,
              showConfirmButton: true,
              confirmButtonText: "Ok",
              confirmButtonColor: "#f76928",
              showClass: {
                popup: "animate__animated animate__zoomIn",
              },
              hideClass: {
                popup: "animate__animated animate__zoomOut",
              },
              timer: 3000,
            });
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
      .put(`http://127.0.0.1:8000/api/transactions/edit/fixed/${id}`, data)
      .then((res) => {
        if (res.data.status === 401) {
          Swal.fire({
            icon: "error",
            title: `${res.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
          this.setState({
            error: res.data.message,
          });
        } else {
          Swal.fire({
            title: `${res.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
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
      .put(`http://127.0.0.1:8000/api/transactions/edit/recurring/${id}`, data)
      .then((res) => {
        if (res.data.status === 401) {
          Swal.fire({
            icon: "error",
            title: `${res.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
          this.setState({
            error: res.data.message,
          });
        } else {
          Swal.fire({
            title: `${res.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
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
        `http://127.0.0.1:8000/api/transactions/edit/allrecurring/${id}`,
        data
      )
      .then((res) => {
        if (res.data.status === 401) {
          Swal.fire({
            icon: "error",
            title: `${res.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
          this.setState({
            error: res.data.message,
          });
        } else {
          Swal.fire({
            title: `${res.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
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
        .delete(`http://127.0.0.1:8000/api/transactions/${id}`)
        .then((res) => {
          Swal.fire({
            title: `${res.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
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
        .delete(`http://127.0.0.1:8000/api/recurrings/${id}`)
        .then((res) => {
          Swal.fire({
            title: `${res.data.message}`,
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#f76928",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 3000,
          });
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
        .get("http://127.0.0.1:8000/api/categories")
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
        .get("http://127.0.0.1:8000/api/categories")
        .then((res) => {
          this.setState({
            categories: res.data.data,
            detailsView: false,
            editView: true,
            type: type,
          });
          // console.log(res.data.data);
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
            {this.state.transactions && (
              <TransactionTable
                transactions={this.state.transactions}
                showDetails={(id) => {
                  this.getById(id);
                }}
                filter={this.state.filterType}
                onPaginate={(pageNumber, type) => {
                  this.setState({
                    loading: true,
                  });
                  this.getAllData(pageNumber, type);
                }}
              />
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
