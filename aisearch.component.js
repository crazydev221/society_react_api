import React, { useEffect, useState, Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HttpCommon from "../http-common";
import axios from "axios";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import jsPDF from "jspdf";
import "jspdf-autotable";

import { CSVLink, CSVDownload } from "react-csv";

class Aisearch extends Component {
  constructor(props) {
    super(props);
    //const user = props.user;

    //alert(user);
    var search = window.location.search;
    var params = new URLSearchParams(search);
    var text = params.get("search");
    var text1 = text;
    if (text === null || text === "") {
      text = "cancer";
    }

    this.state = {
      content: "",
      data: [],
      items: "",
      page: 1,
      search_string: text,
      value: "",
      string: text1,
      enter_text: "",
      loopActive: false,
      shuffleActive: false,
      papers: [],
      total_pages: 0,
      is_api_called: 0,
      is_searched:0,
      sorting: "Sort by",

      headers: [],
      csv_data: [],
      questions: [],
      question: "",
      show_answer: 0,
      offset:0,
      limit:10,

      is_page_clicked:0,
      default_abstract:"",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.someHandler = this.someHandler.bind(this);
    this.someOtherHandler = this.someOtherHandler.bind(this);
  }

  required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  someHandler= (event) => {
     //alert(event.target.attributes.getNamedItem("abs").value);
     if(event.target.attributes.getNamedItem("abs")  !== undefined && event.target.attributes.getNamedItem("abs")  !== null){
     this.setState({
      ['default_abstract']: event.target.attributes.getNamedItem("abs").value,
    });
  }
  };  

  someOtherHandler= (e) => {
    this.setState({
      ['default_abstract']: "",
    });
};  

  handlePrevious= (e) => {

    this.setState({
      ['is_page_clicked']: 1,
    });


    var page = this.state.page;

    if(page > 1){
      page = page -1;
      this.setState({
        ['page']: page,
      });
      this.fetchData();
    }


  }


  handleNext= (e) => {
      
    this.setState({
      ['is_page_clicked']: 1,
    });

      var page = this.state.page;
      page = page + 1;
      this.setState({
        ['page']: page,
      });
      this.fetchData();
  }

  handleQuestion = (e) => {
    e.preventDefault();

    //this.form.validateAll();
    var question = this.state.question;

    if (question === "") {
      return;
    }

    if (this.state.status === "success") return;
    var str = "";
    return axios
      .post(HttpCommon.defaults.baseURL + "/save-question", {
        question: question,
        user: this.props.user.id,
      })
      .then((response) => {
        this.setState({ ["status"]: "success" });
        this.setState({
          ["question"]: "",
        });
      })
      .catch((err) => {
        //alert('dfd')
      });
  };

  generateCsv = () => {
    var items = this.state.data;
    const tableColumn = ["Title", "Authors", "Pub Date", "Abstract Summary"];
    const tableRows = [];

    const ticketData = ["Title", "Authors", "Pub Date", "Abstract Summary"];
    // push each tickcet's info into a row
    tableRows.push(ticketData);

    items.map((data, index) => {
      var str = data.authors
        .map(function(v) {
          return v.name;
        })
        .join(", ");

      if (data.publicationDate !== null) {
        var nameArr = data.publicationDate.split("-");
        var year = nameArr[0];
      } else {
        year = "-";
      }

      var check = this.handleCheck(data.paperId);

      var vl = 0;
      var image_path = "images/icon/check-empty.svg";
      if (check) {
        vl = 1;
        image_path = "images/icon/check.svg";
      }

      var abstract_summary = "";
      if (data.tldr  !== undefined && data.tldr  !== null && data.tldr.text  !== "") {
        abstract_summary = data.tldr.text;
      } else {
        abstract_summary = data.abstract;
      }

      if (
        data.title  !== null &&
        data.title  !== "[null]." &&
        abstract_summary  !== null &&
        abstract_summary  !== ""
      ) {
        const ticketData = [data.title, str, year, abstract_summary];
        // push each tickcet's info into a row
        tableRows.push(ticketData);
      }
    });

    this.setState({
      headers: tableColumn,
    });

    this.setState({
      csv_data: tableRows,
    });
  };

  generatePdf = () => {
    var items = this.state.data;

    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = ["Title", "Authors", "Pub Date", "Abstract Summary"];
    // define an empty array of rows
    const tableRows = [];

    items.map((data, index) => {
      var str = data.authors
        .map(function(v) {
          return v.name;
        })
        .join(", ");

      if (data.publicationDate !== null) {
        var nameArr = data.publicationDate.split("-");
        var year = nameArr[0];
      } else {
        year = "-";
      }

      var check = this.handleCheck(data.paperId);

      var vl = 0;
      var image_path = "images/icon/check-empty.svg";
      if (check) {
        vl = 1;
        image_path = "images/icon/check.svg";
      }

      var abstract_summary = "";
      if (data.tldr  !== undefined && data.tldr  !== null && data.tldr.text  !== "") {
        abstract_summary = data.tldr.text;
      } else {
        abstract_summary = data.abstract;
      }

      if (
        data.title  !== null &&
        data.title  !== "[null]." &&
        abstract_summary  !== null &&
        abstract_summary  !== ""
      ) {
        const ticketData = [data.title, str, year, abstract_summary];
        // push each tickcet's info into a row
        tableRows.push(ticketData);
      }
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.save(`paper_${dateStr}.pdf`);
  };

  getUserPapers(userId) {
    //alert(userId);
    return axios
      .post(HttpCommon.defaults.baseURL + "/get-user-papers", {
        user: userId,
        is_paper: 1,
      })
      .then((response) => {
        this.setState({
          papers: response.data,
        });
      })
      .catch((err) => {
        //alert('dfd')
      });
  }

  getUserQuestions(userId) {
    //alert(userId);
    return axios
      .post(HttpCommon.defaults.baseURL + "/get-user-questions", {
        user: userId,
      })
      .then((response) => {
        this.setState({
          questions: response.data,
        });

        this.questions.map((data, index) => {
          if (data.answer  !== null && data.answer  !== "") {
            this.setState({
              show_answer: 1,
            });
          }
        });
      })
      .catch((err) => {
        //alert('dfd')
      });
  }

  handleOnChange = (event) => {
    this.setState({
      enter_text: event.target.value,
    });

    this.setState({
      string: event.target.value,
    });
  };

  sortTitle = (event) => {
    this.setState({
      sorting: "Title",
    });

    var data = this.state.data;

    data.sort(function(a, b) {
      return b.title.toLowerCase() < a.title.toLowerCase();
    });

    this.setState({
      data: data,
    });

    this.generateCsv();
  };

  sortDate = (event) => {
    this.setState({
      sorting: "Date",
    });

    var data = this.state.data;

    data.sort(function(a, b) {
      return a.publicationDate < b.publicationDate;
    });

    this.setState({
      data: data,
    });

    this.generateCsv();
  };

  sortCitations = (event) => {
    this.setState({
      sorting: "Citations",
    });

    var data = this.state.data;

    data.sort((a, b) => b.citationCount - a.citationCount);

    this.setState({
      data: data,
    });

    this.generateCsv();
  };

  doArrowSearch = (event) => {
    if (this.state.enter_text  !== "") {


      this.setState({
        is_searched: 1,
      });


      //alert(this.state.enter_text)
      this.setState({
        value: this.state.enter_text,
      });
    }
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.setState({
        is_searched: 1,
      });

      this.setState({
        value: event.target.value,
      });
      //this.doSearch()
    }
  };

  saveSaved(userId, check, paperId, title, authors, year, citationCount) {
    if (check === 1) check = 0;
    else check = 1;

    var is_paper = 1;

    return axios
      .post(HttpCommon.defaults.baseURL + "/save-paper", {
        user: userId,
        citationCount: citationCount,
        check: check,
        paperId: paperId,
        title: title,
        authors: authors,
        year: year,
        is_paper: is_paper,
      })
      .then((response) => {})
      .catch((err) => {
        //alert('dfd')
      });
  }

  handleCheck(val) {
    const index = this.state.papers.findIndex((item) => item.paper_id === val);

    if (index >= 0) return 1;
    else return 0;
  }

  fetchData = () => {
    this.setState({
      is_api_called: 0,
    });

    this.setState({
      data: [],
    });


    var pageNumber = this.state.page;
    var offst = (pageNumber - 1) * 10 ;

    fetch(
      "https://api.semanticscholar.org/graph/v1/paper/search?query=" +
        this.state.search_string +
        "&offset=" +
        offst +
        "&limit=10&isOpenAccess=true&fields=title,abstract,authors,publicationDate,citationCount,tldr"
    )
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        this.setState({
          is_api_called: 1,
        });
        if (data.data  !== undefined) {
          if (this.state.sorting === "Citations") {
            data.data.sort((a, b) => a.citationCount - b.citationCount);
          }

          if (this.state.sorting === "Title") {
            data.data.sort(function(a, b) {
              return b.title.toLowerCase() < a.title.toLowerCase();
            });
          }

          if (this.state.sorting === "Date") {
            data.data.sort(function(a, b) {
              return b.publicationDate < a.publicationDate;
            });
          }

          this.setState({
            data: data.data,
          });

          this.generateCsv();
          
          var pg = data.total/10;
          var page_count = Math.ceil(pg);

          this.setState({
            page_count: page_count,
          });

        } else return "";

        var arrayOfLists = "";

        arrayOfLists = data.data.map(function(record) {
          var str = record.authors
            .map(function(v) {
              return v.name;
            })
            .join(", ");

          if (record.publicationDate !== null) {
            var nameArr = record.publicationDate.split("-");
            var year = nameArr[0];
          } else {
            year = "-";
          }

          return (
            <tr>
              <td>
                <h5>
                  <img src="images/icon/check-empty.svg" alt="" />
                  {record.title}
                </h5>
                <p className="meta">
                  <span></span>
                </p>
              </td>
              <td>
                <p className="author">
                  <span>{str}</span>
                </p>
              </td>
              <td>{year}</td>
            </tr>
          );
        });

        this.setState({
          items: arrayOfLists,
        });

        //console.log(data);
      })
      .catch((err) => {
        this.setState({
          is_api_called: 1,
        });

        var arrayOfLists = (
          <tr>
            <td>
              <h5>To many requests. Please try in some time.</h5>
              <p className="meta">
                <span></span>
              </p>
            </td>
            <td>
              <p className="author">
                <span></span>
              </p>
            </td>
            <td></td>
          </tr>
        );
        this.setState({
          items: arrayOfLists,
        });
      });
  };

  saveCheck = (event) => {
    this.saveSaved(
      this.props.user.id,
      event.target.attributes.getNamedItem("data-check").value,
      event.target.attributes.getNamedItem("data-paperId").value,
      event.target.attributes.getNamedItem("data-title").value,
      event.target.attributes.getNamedItem("data-author").value,
      event.target.attributes.getNamedItem("data-year").value,
      event.target.attributes.getNamedItem("data-citationCount").value
    );
    //event.target.attributes.getNamedItem('data-title').value
    if (event.target.attributes.getNamedItem("data-check").value === 0) {
      event.target.attributes.getNamedItem("data-check").value = 1;
      event.target.attributes.getNamedItem("src").value =
        "images/icon/check.svg";
    } else {
      event.target.attributes.getNamedItem("data-check").value = 0;
      event.target.attributes.getNamedItem("src").value =
        "images/icon/check-empty.svg";
    }

    //alert(event.target.attributes.getNamedItem('data-title').value)
  };

  componentDidMount() {
    this.setState({
      page: 1,
    });
    this.setState({
      ['is_page_clicked']: 0,
    });
    this.fetchData();

    var { user: currentUser } = this.props;

    if (currentUser) {
       this.getUserPapers(this.props.user.id);
       this.getUserQuestions(this.props.user.id);
    } 
  }

  componentDidUpdate(prevProps) {
    const timeoutId = setTimeout(() => this.doSearch(), 1000);
    return () => clearTimeout(timeoutId);
  }

  doSearch() {
    if (this.state.value  !== "") {
      this.setState({
        search_string: this.state.value,
      });

      this.setState({
        page: 1,
      });

      this.setState({
        ['is_page_clicked']: 0,
      });

      this.fetchData();

      this.setState({
        value: "",
      });
    }
  }

  printDocument() {}

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      document.cookie =
        "purple_redirect=airesearch; max-age=" + 3000 * 24 * 60 * 60;
      return <Redirect to="/login" />;
    }

    var items = [];
    items = this.state.data;

    var headers = this.state.headers;
    var csv_data = this.state.csv_data;

    var default_abstract = "";

    //console.log("AMITABH");
    //console.log(items);

    //alert(this.state.is_api_called);
    return (
      <div>
        <section className="research-one">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="search-bar">
                  <div className="form-group m-0">
                    <input
                      onChange={this.handleOnChange}
                      onKeyDown={this.handleKeyDown}
                      type="text"
                      className="form-control"
                      placeholder="I want to see articles on Childhood Cancer"
                      value={this.state.string}
                    />
                    <button onClick={this.doArrowSearch}>
                      <img src="images/icon/arrow-double-right.svg" alt="" />
                    </button>
                  </div>
                </div>
                <p className="m-0">Ask a question or enter a search term.</p>
              </div>
            </div>
          </div>
        </section>

        {this.state.is_api_called === 1 && this.state.is_searched === 1 && items.length === 0 && (
          <>
            <section className="no-search">
              <div className="container">
                <div className="col-12 text-center">
                  <div className="img-sec">
                    <img src="images/no-search.png" alt="" />
                  </div>
                  <div className="heading-one">
                    <h1 className="fz-20">No Research Found</h1>
                    <p>
                      We apologize that your search did not yield any results.
                      Purple AI has logged the search term and notified our
                      research team. We understand that finding the information
                      you need, especially when it comes to your child’s health,
                      is the most important thing.
                    </p>
                    <p>
                      There could be a number of reasons why your search didn’t
                      return any results. It’s possible that the information you
                      are looking for is not yet available on our website or not
                      included in our database.{" "}
                    </p>
                    <p>
                      We want to ensure that you have access to the most
                      up-to-date and accurate information about childhood
                      cancer, so please do not hesitate to reach out to us
                      directly for more information or support. Our team is here
                      to help and will be more than happy to assist you in any
                      way we can.{" "}
                    </p>
                    <br></br>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        { ((items  !== undefined && items.length > 0) || this.state.is_page_clicked === 1) && (
          <section class="research-two">
            <div class="container">
              <div class="row gap-2">
                <div class="col-lg-8 col-md-8">
                  <div class="left-sec">
                    <div class="filter-one">
                      <h5>I’ve found these results</h5>
                      <div class="btn-sec">
                        <div class="dropdown">
                          <button
                            class="btn btn-white-border dropdown-toggle"
                            type="button"
                            id="filterDropdown"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Filter <i className="fa fa-angle-down"></i>
                          </button>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="filterDropdown"
                          >
                            <a class="dropdown-item" href="javascript:void(0);">
                              <img src="images/icon/search2.svg" alt="" />
                              <span>Keyword</span>
                            </a>
                            <a class="dropdown-item" href="javascript:void(0);">
                              <img src="images/icon/time.svg" alt="" />
                              <span>Published Date</span>
                            </a>
                            <a class="dropdown-item" href="javascript:void(0);">
                              <img src="images/icon/study.svg" alt="" />
                              <span>Study Type</span>
                            </a>
                          </div>
                        </div>
                        <div class="dropdown">
                          <button
                            class="btn btn-white-border dropdown-toggle"
                            type="button"
                            id="shortByDropdown"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {this.state.sorting}{" "}
                            <i className="fa fa-angle-down"></i>
                          </button>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="shortByDropdown"
                          >
                            <a
                              class="dropdown-item"
                              href="javascript:void(0);"
                              onClick={this.sortTitle}
                            >
                              <img src="images/icon/title.svg" alt="" />
                              <span>Title</span>
                            </a>
                            <a
                              class="dropdown-item"
                              href="javascript:void(0);"
                              onClick={this.sortDate}
                            >
                              <img src="images/icon/time.svg" alt="" />
                              <span>Date</span>
                            </a>
                            <a
                              class="dropdown-item"
                              href="javascript:void(0);"
                              onClick={this.sortCitations}
                            >
                              <img src="images/icon/citations.svg" alt="" />
                              <span>Citations</span>
                            </a>
                          </div>
                        </div>
                        {/* <div class="dropdown">
                          <button
                            class="btn btn-white-border dropdown-toggle"
                            type="button"
                            id="exportDropdown"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Export as <i className="fa fa-angle-down"></i>
                          </button>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="exportDropdown"
                          >
                            <a
                              class="dropdown-item"
                              href="javascript:void(0);"
                              onClick={this.generatePdf}
                            >
                              <img src="images/icon/pdf.svg" alt="" />
                              <span>PDF</span>
                            </a>
                            <a class="dropdown-item" href="javascript:void(0);">
                              <img src="images/icon/csv.svg" alt="" />
                              <span>
                                <CSVLink data={csv_data}>CSV</CSVLink>
                              </span>
                            </a>
                            <a
                              class="dropdown-item"
                              href="#"
                              style={{ display: "none" }}
                            >
                              <img src="images/icon/bib.svg" alt="" />
                              <span>BIB</span>
                            </a>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <div id="keywordModal" className="modal fade pageLoadModal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <div className="keyword-form">
                              <label className="mb-0">
                                Abstract <b>contains</b> the keywords
                              </label>
                              <div className="form-inline">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id=""
                                    placeholder="Add keywords to include"
                                  />
                                </div>
                                <button
                                  type="submit"
                                  class="btn btn-white-border"
                                >
                                  Add
                                </button>
                              </div>
                              <div className="tags">
                                <span className="tag-item">
                                  <span>cancer</span>
                                  <button>
                                    <i className="fa fa-close"></i>
                                  </button>
                                </span>
                              </div>
                            </div>
                            <div className="keyword-formmt-3">
                              <label className="mb-0">
                                Abstract <b>contains</b> the keywords
                              </label>
                              <div className="form-inline">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id=""
                                    placeholder="Add keywords to include"
                                  />
                                </div>
                                <button
                                  type="submit"
                                  class="btn btn-white-border"
                                >
                                  Add
                                </button>
                              </div>
                              <div className="tags">
                                <span className="tag-item">
                                  <span>cancer</span>
                                  <button>
                                    <i className="fa fa-close"></i>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="publishModal" className="modal fade pageLoadModal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <ul className="filter-list">
                              <li>
                                <a href="#">Any Year</a>
                              </li>
                              <li>
                                <a href="#">2023</a>
                              </li>
                              <li>
                                <a href="#">2022</a>
                              </li>
                              <li>
                                <a href="#">2021</a>
                              </li>
                              <li>
                                <a href="#">2020</a>
                              </li>
                              <li>
                                <a href="#">2019</a>
                              </li>
                              <li>
                                <a href="#">2018</a>
                              </li>
                              <li>
                                <a href="#">2017</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="studyModal" className="modal fade pageLoadModal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <ul className="filter-list">
                              <li>
                                <a href="#">Randomized Controlled Trial</a>
                              </li>
                              <li>
                                <a href="#">Review</a>
                              </li>
                              <li>
                                <a href="#">Systematic Review</a>
                              </li>
                              <li>
                                <a href="#">Meta-Analysis</a>
                              </li>
                              <li>
                                <a href="#">Longitudinal</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="table-responsive" id="divToPrint">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Author(s)</th>
                            <th>Pub Date</th>
                         
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((data, index) => {




                            var str = data.authors
                              .map(function(v) {
                                return v.name;
                              })
                              .join(", ");

                            if (data.publicationDate !== null) {
                              var nameArr = data.publicationDate.split("-");
                              var year = nameArr[0];
                            } else {
                              year = "-";
                            }

                            var check = this.handleCheck(data.paperId);

                            var vl = 0;
                            var image_path = "images/icon/check-empty.svg";
                            if (check) {
                              vl = 1;
                              image_path = "images/icon/check.svg";
                            }

                            var abstract_summary = "";
                            if (
                              data.tldr  !== undefined &&
                              data.tldr  !== null &&
                              data.tldr.text  !== ""
                            ) {
                              abstract_summary = data.tldr.text;
                            } else {
                              abstract_summary = data.abstract;
                            }

                            if(index === 0){
                              default_abstract = abstract_summary;
                             }

                             if(this.state.default_abstract  !== ''){
                              default_abstract = this.state.default_abstract;
                             }


                            return (
                              <>
                                {data.title  !== null ? (
                                  <tr>
                                    <td onMouseEnter={this.someHandler}  onMouseLeave={this.someOtherHandler} abs={abstract_summary}>
                                      <h5>
                                        <img
                                          data-check={vl}
                                          data-citationCount={
                                            data.citationCount
                                          }
                                          data-paperId={data.paperId}
                                          data-title={data.title}
                                          data-author={str}
                                          data-year={year}
                                          onClick={this.saveCheck}
                                          src={image_path}
                                          alt=""
                                        />
                                        <a
                                          href={
                                            "/researchquestion?paper=" +
                                            data.paperId
                                          }
                                        >
                                          {data.title}
                                        </a>
                                      </h5>
                                      <p className="meta">
                                        <span>
                                          {data.citationCount} Citations
                                        </span>
                                      </p>
                                    </td>
                                    <td onMouseEnter={this.someHandler}  onMouseLeave={this.someOtherHandler} abs={abstract_summary}>
                                      <p className="author">
                                        <span>{str}</span>
                                      </p>
                                    </td>
                                    <td onMouseEnter={this.someHandler}  onMouseLeave={this.someOtherHandler} abs={abstract_summary}>{year}</td>

   
                                  </tr>
                                ) : null}
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div class="pagination-one">
                      <p class="m-0">Page {this.state.page} of {this.state.page_count}</p>
                      <div class="btn-sec">
                        <a href="javascript:void(0);" class="btn btn-white-border" onClick={this.handlePrevious}>
                          <img src="images/icon/long-arrow-left.svg" alt="" />
                          <span>Previous</span>
                        </a>
                        <a href="javascript:void(0);" class="btn btn-white-border" onClick={this.handleNext}>
                          <span>Next</span>
                          <img src="images/icon/long-arrow-right.svg" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-4">
                  <div class="right-sec">
                    <div class="filter-one">
                      <h5>Abstract Summary</h5>
                      <div class="btn-sec">
                        <div class="dropdown">
                          <button
                            class="btn btn-white-border dropdown-toggle"
                            type="button"
                            id="exportDropdown"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Export as <i className="fa fa-angle-down"></i>
                          </button>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="exportDropdown"
                          >
                            <a
                              class="dropdown-item"
                              href="javascript:void(0);"
                              onClick={this.generatePdf}
                            >
                              <img src="images/icon/pdf.svg" alt="" />
                              <span>PDF</span>
                            </a>
                            <a class="dropdown-item" href="javascript:void(0);">
                              <img src="images/icon/csv.svg" alt="" />
                              <span>
                                <CSVLink data={csv_data}>CSV</CSVLink>
                              </span>
                            </a>
                            <a
                              class="dropdown-item"
                              href="#"
                              style={{ display: "none" }}
                            >
                              <img src="images/icon/bib.svg" alt="" />
                              <span>BIB</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="box-one">
                      <p>
                        <b>
                         {default_abstract}
                        </b>
                      </p>
                    </div>
                    <div class="box-one" style={{display:"none"}}>
                      <h6>Who were the participants?</h6>
                      <p>
                        42 children with cancer in the United States, including
                        epidemiologists, molecular biologists, pediatric
                        oncologists, nurses, and other health professionals
                      </p>
                    </div>
                    <div class="box-one" style={{display:"none"}}> 
                      <h6>Can I trust this paper?</h6>
                      <ul class="disk-list">
                        <li>
                          This study was an analysis of data from the Children's
                          Oncology Group Epidemiology Research Program
                        </li>
                        <li>Funded by National Cancer Institute</li>
                        <li>42 participants</li>
                        <li>No mention found of multiple comparisons</li>
                        <li>No mention found of intent to treat</li>
                        <li>No mention found of preregistration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 col-12 offset-md-4">
                  <div class="ask-question">
                    <h6>Have any questions on this paper?</h6>
                    {this.state.status === "success" && (
                      <p>
                        <div role="alert" class="alert alert-success">
                          Your question is submitted successfully! We will get
                          back to you.
                        </div>
                      </p>
                    )}
                    <Form
                      onSubmit={this.handleQuestion}
                      ref={(c) => {
                        this.form = c;
                      }}
                    >
                      <div class="ask-box">
                        <div class="form-group m-0">
                          <Input
                            placeholder="Ask your question here"
                            type="text"
                            className="form-control"
                            name="question"
                            value={this.state.question}
                            onChange={this.handleChange}
                          />
                          <img src="images/icon/question.svg" alt="" />
                        </div>
                        <button>Ask</button>
                      </div>
                    </Form>
                    <p>
                      Purple Ai can explore deeper answers to any questions you
                      have on your selected research.
                    </p>
                  </div>
                </div>
                {this.state.show_answer === 1 ? (
                  <>
                    <div class="col-12">
                      <div class="answer-sec">
                        <h5>Answer</h5>
                        <div class="answer-box">
                          {this.state.questions.map((data) => (
                            <>
                              {data.answer  !== null && data.answer  !== "" ? (
                                <>
                                  <h6>{data.question}</h6>
                                  <p>
                                    {data.answer}
                                    <br />
                                  </p>
                                </>
                              ) : null}
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Aisearch);
