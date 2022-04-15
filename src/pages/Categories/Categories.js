import React, { Component } from "react";
import { CategoriesTable } from "../../components/CategoryTable/CategoryTable";
import { AddButton } from "../../components/Buttons/Button";
import axios from "axios";
import Swal from "sweetalert2";
import "animate.css";
 
import LoadingComponent from "../../components/Loading/Loading";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsView: false,
      formView: false,
      Categories: [],
      Category: {},
      loading: true,
      edit_category_id: null,
    };
  }

  componentDidMount() {
    this.getAllData();
    // this.getById();
  }
  //get all categories

  getAllData = async () => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/categories`)
        .then((res) => {
          this.setState({
            Categories: res.data.data,
            loading: false,
          });
          // console.log(this.state.Categories);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  // get by id category

  getById = async (id) => {
    try {
      await axios
        .get(`https://financial-app-api.herokuapp.com/api/categories/${id}`)
        .then((res) => {
          this.setState({
            Category: res.data.data,
            detailsView: false,
            formView: false,
          });
          // console.log(this.state.Category);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
  // add new categories

  addNew = async (data) => {
    // console.log(data);
    await axios
      .post(`https://financial-app-api.herokuapp.com/api/categories`, data)
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
          this.setState({ loading: true, formView: false });
          this.getAllData();
        }
      })
      .catch((err) => console.log(err.message));
  };

  //edit categories

  edit = async (data, id) => {
    // console.log("data put ", data);
    await axios
      .put(`https://financial-app-api.herokuapp.com/api/categories/edit/${id}`, data)
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
          this.setState({ loading: true });
          this.getAllData();
        }
      })
      .catch((err) => console.log(err.message));
  };

  //delete categories
  delete = async (id) => {
    await axios
      .delete(`https://financial-app-api.herokuapp.com/api/categories/${id}`)
      .then((res) => {
        Swal.fire({
          text: "Are you sure you want to delete this transaction?",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes, delete it",
          confirmButtonColor: "#f76928",
          cancelButtonColor: "#555",
        }).then((result) => {
          if (result.isConfirmed) {
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
            this.setState({ loading: true });
            this.getAllData();
          }
        });
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
            <h1>Categories</h1>
            <AddButton
              title="Add Category"
              class="btn-submit add_category"
              onClick={() => this.setState({ formView: true })}
            />
          </div>
          <CategoriesTable
            data={this.state.Categories}
            showDetails={(id) => this.getById(id)}
            onSubmitHandler={(data) => this.addNew(data)}
            onEdit={(data, id) => this.edit(data, id)}
            onChangeHandlerdelete={(id) => this.delete(id)}
          />
        </div>
      );
    }
  }
}
export default Categories;
