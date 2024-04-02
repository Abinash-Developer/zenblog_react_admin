import React from "react";
import { useState } from "react";
import Footer from "../common_component/Footer";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Addtag() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const validateForm = async (e) => {
    e.preventDefault();
    if (name.length > 0) {
        try {
            if (name.length > 0) {
                const response = await axios.post('http://localhost:3001/create_tag', { name:name }, {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                if(response.data.sucess){
                    swal({
                        title: "Good job!",
                        text: "Category saved successfully",
                        icon: "success",
                        button: "Okay",
                      }).then((item) => {
                        if(item){
                            Navigate("/tags");
                        }
                      });
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    } else {
      setError("Please add category name");
    }
  };
  const removeError = () => {
    setError("");
  };
  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title"> Tag Form </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="#">Forms</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
              Tag Form
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">ADD NEW TAG</h4>
                <p className="card-description">ADD NEW TAG</p>
                <form className="forms-sample">
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      onKeyUp={removeError}
                    />
                    <span>{error}</span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mr-2"
                    onClick={validateForm}
                  >
                    Submit
                  </button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* content-wrapper ends */}
      {/* partial:../../partials/_footer.html */}
      <Footer />
      {/* partial */}
    </div>
  );
}
