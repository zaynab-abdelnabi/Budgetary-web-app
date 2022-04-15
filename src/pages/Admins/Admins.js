import React, { Component } from "react";
import Swal from "sweetalert2";
import "animate.css";
import { AddButton } from "../../components/Buttons/Button";
import EditAdmin from "../../components/Forms/EditAdmin";
import { AdminsTable } from "../../components/AdminsTable/AdminsTable";
import AddAdmin from "../../components/Forms/AddAdmin";
import "./Admins.css";
import axios from "axios";
import LoadingComponent from "../../components/Loading/Loading";

export default class Admins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editView: false,
      addView: false,
      admins: undefined,
      admin: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  // Get all admins
  getAllData = async () => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/admins`)
        .then((res) => {
          this.setState({
            admins: res.data.data,
            loading: false,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  // Adding new admin
  addNew = async (data) => {
    try {
      await axios
        .post(`https://financial-app-api.herokuapp.com/api/admins`, data)
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
            this.setState({ loading: true, addView: false });
            this.getAllData();
          }
          // console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  // Delete admin by id
  deleteById = async (id) => {
    try {
      await axios
        .delete(`https://financial-app-api.herokuapp.com/api/admins/${id}`)
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
          this.setState({ loading: true, editView: false, addView: false });
          this.getAllData();
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  //get admin by id
  getById = async (id) => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/admins/${id}`)
        .then((res) => {
          this.setState({
            admin: res.data.data,
            editView: true,
            addView: false,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  //Edit admin by id
  editById = async (data) => {
    // console.log("data put ", data);
    await axios
      .put(`https://financial-app-api.herokuapp.com/api/admins/edit/${data.id}`, data)
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
          this.setState({ loading: true, editView: false, addView: false });
          this.getAllData();
        }
      })
      .catch((err) => console.log(err.message));
  };

  editPassword = async (data) => {
    // console.log("data put ", data.id);
    await axios
      .put(`https://financial-app-api.herokuapp.com/api/admins/password`, data)
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
          this.setState({ loading: true, editView: false, addView: false });
          this.getAllData();
        }
      })
      .catch((err) => console.log(err.message));
  };

  render() {
    if (this.state.loading) {
      return <LoadingComponent />;
    } else {
      return (
        <div>
          <div className="page-heading">
            <h1>Admins</h1>
            <AddButton
              title="Add Admin"
              onClick={() => {
                this.setState({ addView: true, editView: false });
              }}
            />
          </div>
          <div className="admin-content">
            {this.state.admins && (
              <AdminsTable
                data={this.state.admins}
                delete={(id) => this.deleteById(id)}
                edit={(id) => this.getById(id)}
              />
            )}

            {this.state.addView && (
              <AddAdmin
                onSubmit={(data) => this.addNew(data)}
                close={() => this.setState({ addView: false })}
              />
            )}
            {this.state.editView && (
              <EditAdmin
                close={() => this.setState({ editView: false })}
                data={this.state.admin}
                onSubmitInfo={(data) => this.editById(data)}
                onSubmitPassword={(data) => this.editPassword(data)}
              />
            )}
          </div>
        </div>
      );
    }
  }
}
