import React from "react";
import "../Shared/FontAwesomeIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SecondNavbar from "../SecondNavbar";
import sunglasses_emoji from "../../../Assets/img/sunglasses_emoji.png";
import Relieved_Emoji from "../../../Assets/img/Relieved_Emoji.png";
import Neutral_Emoji from "../../../Assets/img/Neutral_Emoji.png";
import confounded_face from "../../../Assets/img/confounded-face.png";
import Expressionless_Face from "../../../Assets/img/Expressionless_Face.png";
import GetData from "../../Api/GetData";
import PostData from "../../Api/PostData";
import SearchableSelect from "../../atoms/SearchableSelect";
import Account from "../../Api/Account";
import { message } from "antd";

class SubjectRateMe extends React.Component {
  constructor(props) {
    super();
    this.state = {
      subjectID: props.match.params.subjectID,
      majorID: props.match.params.majorID,
      again: "",
      ratting: "",
      hardRating: "",
      YearTaken: "",
      Project: "",
      Homework: "",
      name: "Select Grade",
      year: "Select Year",
      tags: [],
      selectedTags: [],
      years: [],
      grades: [],
      hardlevels: [],
      rating: [],
      examform: [],
      teachingstyle: [],
      Description: "",
      subjectError: false,
      gradeError: false,
      yearError: false,
      ExamForm: "",
      isLoading: true,
      count: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // GetData.Countries(this.Set);
    GetData.Grades(this.Set);
    GetData.YearTaken(this.Set);
    GetData.HardLevels(this.Set);
    GetData.Rating(this.Set);
    GetData.ExamForm(this.Set);
    GetData.TeachingStyle(this.Set);
    GetData.SubjectTags(this.Set);
  }

  Set = (name, data) => {
    console.log({ name, data });
    this.setState(
      {
        [name]: data,
        update: true,
      },
      () => {
        if (
          this.state.examform.length &&
          this.state.tags.length &&
          this.state.hardlevels.length &&
          this.state.grades.length &&
          this.state.rating.length
        ) {
          this.setState({
            isLoading: false,
          });
        }
      },
    );
  };

  handleChange(event) {
    console.log(event.target.value);
    const { name, value, type, checked } = event.target;
    if (name === "selectedTags") {
      if (!this.state.selectedTags.includes(value)) {
        let temp = this.state.selectedTags;
        temp.push(value);

        this.setState({
          selectedTags: temp,
        });
      } else {
        this.setState({
          selectedTags: this.state.selectedTags.filter((el) => el !== value),
        });
      }
    } else if (type === "checkbox") {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
    console.log(this.state);
  }
  onChange = (e, name) => {
    this.setState({
      [name]: e,
      count: 0,
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    const {
      hardRating,
      Project,
      Homework,
      examform,
      Description,
      again,
      ratting,
    } = this.state;
    this.setState({
      count: 1,
    });

    if (
      hardRating &&
      Project &&
      Homework &&
      examform &&
      Description &&
      again &&
      ratting
    ) {
      PostData.SubjectRattingAdd(this.state, this.set);
    }
  }

  render() {
    return (
      <>
        <SecondNavbar />
        {this.state.isLoading ? (
          <p>Loading.....</p>
        ) : (
          <div className="container-fluid RateMe">
            <div className="MaxWidth">
              <div className="row mt-4">
                <div className="col-11 col-md-10 mx-auto space-between">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row col-12 col-md-8 col-lg-6 mx-auto bg-white ShadowBordr Round25 p-4">
                      <div className="col-12 Bold ">
                        <p className="Bold">Rate Me</p>
                      </div>
                      <div className="row col-12 mx-auto form px-0">
                        <div className="col-lg-12 col-md-6 col-12 form-group px-1 mb-2">
                          <SearchableSelect
                            name="year"
                            value={this.state.year}
                            function={this.onChange}
                            list={this.state.years}
                            objName="year"
                            label="Year"
                            Error={
                              this.state.count == 1 &&
                              this.state.year == "Select Year"
                            }
                          />
                        </div>
                        {console.log("state", this.state.grades)}
                        <div className="col-lg-12 col-md-6 col-12 form-group px-1 mb-2">
                          <SearchableSelect
                            name="gradeID"
                            value={this.state.gradeID}
                            function={this.onChange}
                            list={this.state.grades}
                            objName="name"
                            label="Grade"
                            Error={
                              this.state.count == 1 &&
                              this.state.name == "Select Grade"
                            }
                          />
                        </div>
                      </div>
                      <div className="col-12  mt-3">
                        <p className="FS_16 mb-0 Bold">Rating</p>
                      </div>
                      <div className="col-12 rating-wrapper mt-3 px-0">
                        <label className="rating-label  w-100">
                          <div className="ratingItemList  p-0 d-flex">
                            {this.state.rating.map((each) => {
                              return (
                                <>
                                  <input
                                    className="d-none rating rating-5"
                                    id={each.name}
                                    type="radio"
                                    value={each.ratingID}
                                    onClick={this.handleChange}
                                    name="ratting"
                                  />
                                  <label
                                    className="rating rating-5"
                                    htmlFor={each.name}
                                  >
                                    <FontAwesomeIcon
                                      icon="star"
                                      color="rgb(254, 193, 7)"
                                    />
                                    <p className="Bold Black FS_10">
                                      {each.name}
                                    </p>
                                  </label>
                                </>
                              );
                            })}
                          </div>
                        </label>
                        {this.state.count == 1 && this.state.rating == "" ? (
                          <p className="Errored text-center">
                            Select one of These
                          </p>
                        ) : null}
                      </div>
                      <div className="col-12  mt-3">
                        <p className="FS_16 mb-0 Bold">Hardness level</p>
                      </div>
                      <div className="col-12 rating-wrapper mt-2 px-0">
                        <label className="rating-label  w-100">
                          <div className="ratingItemList  p-0 d-flex">
                            <input
                              className="d-none rating rating-1"
                              id="hardRating-1-2"
                              type="radio"
                              value={this.state.hardlevels[0].hardLevelID}
                              onClick={this.handleChange}
                              name="hardRating"
                            />
                            <label
                              className="rating rating-1"
                              htmlFor="hardRating-1-2"
                            >
                              <i>
                                <img
                                  className="mb-3"
                                  src={sunglasses_emoji}
                                  alt=""
                                  height="36px"
                                />
                              </i>
                              <p className="Bold Black FS_10">
                                {this.state.hardlevels[0].name}
                              </p>
                            </label>
                            <input
                              className="d-none rating rating-2"
                              id="hardrating-2-2"
                              type="radio"
                              value={this.state.hardlevels[1].hardLevelID}
                              onClick={this.handleChange}
                              name="hardRating"
                            />
                            <label
                              className="rating rating-2"
                              htmlFor="hardrating-2-2"
                            >
                              <i>
                                <img
                                  className="mb-3"
                                  src={Relieved_Emoji}
                                  alt=""
                                  height="36px"
                                />
                              </i>
                              <p className="Bold Black FS_10">
                                {this.state.hardlevels[1].name}
                              </p>
                            </label>
                            <input
                              className="d-none rating rating-3"
                              id="hardrating-3-2"
                              type="radio"
                              value={this.state.hardlevels[2].hardLevelID}
                              onClick={this.handleChange}
                              name="hardRating"
                            />
                            <label
                              className="rating rating-3"
                              htmlFor="hardrating-3-2"
                            >
                              <i>
                                <img
                                  className="mb-3"
                                  src={Neutral_Emoji}
                                  alt=""
                                  height="36px"
                                />
                              </i>
                              <p className="Bold Black FS_10">
                                {this.state.hardlevels[2].name}
                              </p>
                            </label>
                            <input
                              className="d-none rating rating-4"
                              id="hardrating-4-2"
                              type="radio"
                              value={this.state.hardlevels[3].hardLevelID}
                              onClick={this.handleChange}
                              name="hardRating"
                            />
                            <label
                              className="rating rating-4"
                              htmlFor="hardrating-4-2"
                            >
                              <i>
                                <img
                                  className="mb-3"
                                  src={confounded_face}
                                  alt=""
                                  height="36px"
                                />
                              </i>
                              <p className="Bold Black FS_10">
                                {this.state.hardlevels[3].name}
                              </p>
                            </label>
                            <input
                              className="d-none rating rating-5"
                              id="hardrating-5-2"
                              type="radio"
                              value={this.state.hardlevels[4].hardLevelID}
                              onClick={this.handleChange}
                              name="hardRating"
                            />
                            <label
                              className="rating rating-5"
                              htmlFor="hardrating-5-2"
                            >
                              <i>
                                <img
                                  className="mb-3"
                                  src={Expressionless_Face}
                                  alt=""
                                  height="36px"
                                />
                              </i>
                              <p className="Bold Black FS_10">
                                {this.state.hardlevels[4].name}
                              </p>
                            </label>
                          </div>
                        </label>
                        {this.state.count == 1 &&
                        this.state.hardRating == "" ? (
                          <p className="Errored text-center">
                            Select one of These
                          </p>
                        ) : null}
                      </div>
                      <div className="d-inline-flex">
                        <div className="col-lg-12 col-md-6 col-12 my-2  ">
                          <h5 className="mt-3 Bold">Project</h5>
                          <ul class="w-100 combineButton RadioToButton d-inline-flex px-0 my-1 mt-2">
                            <li className="w-50 text-center">
                              <input
                                type="radio"
                                id="Gives Project"
                                name="Project"
                                value="Gives"
                                onClick={this.handleChange}
                              />
                              <label
                                htmlFor="Gives Project"
                                className="py-1 mb-0 Bold FS_12 "
                              >
                                Gives
                              </label>
                            </li>
                            <li className="w-50 text-center">
                              <input
                                type="radio"
                                id="Don't Give Project"
                                name="Project"
                                value="Don't Give"
                                onClick={this.handleChange}
                              />
                              <label
                                htmlFor="Don't Give Project"
                                className="py-1 mb-0 Bold FS_12"
                              >
                                Don't Give
                              </label>
                            </li>
                          </ul>
                          {this.state.count == 1 && this.state.Project == "" ? (
                            <p className="Errored">Select one of These</p>
                          ) : null}
                        </div>
                        <div
                          className="col-lg-12 col-md-6
                        col-12   mt-4"
                        >
                          <h5>Homework</h5>
                          <ul class="w-100 combineButton RadioToButton d-inline-flex px-0 my-1 mt-2">
                            <li className="w-50 text-center">
                              <input
                                type="radio"
                                id="GivesHomeWork"
                                name="Homework"
                                value="Give "
                                onClick={this.handleChange}
                              />
                              <label
                                htmlFor="GivesHomeWork"
                                className="py-1 mb-0 Bold FS_12"
                              >
                                Give
                              </label>
                            </li>
                            <li className="w-50 text-center">
                              <input
                                type="radio"
                                id="Don't Gives Homework"
                                name="Homework"
                                value="Don't Gives "
                                onClick={this.handleChange}
                              />
                              <label
                                htmlFor="Don't Gives Homework"
                                className="py-1 mb-0 Bold FS_12"
                              >
                                Don't Gives
                              </label>
                            </li>
                          </ul>
                          {this.state.count == 1 &&
                          this.state.Homework == "" ? (
                            <p className="Errored">Select one of These</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-12 mt-3  px-0 RadioToButton Tags">
                        <p className="FS_16 mt-3 Bold">
                          Select up to three tags that best describe your
                          subject
                        </p>
                        <p
                          className="m-0"
                          style={{ color: "red" }}
                          id="chkbox"
                        ></p>
                        {console.log("tags", this.state.tags)}

                        {this.state.tags.map((each) => {
                          return (
                            <div className="form-check-inline col-5 col-sm-3 my-2 text-center  px-1">
                              <input
                                type="checkbox"
                                id={each.tagEN}
                                className="chkbox"
                                value={each.tagID}
                                name="selectedTags"
                                disabled={
                                  !this.state.selectedTags.includes(
                                    each.tagEN,
                                  ) && this.state.selectedTags.length >= 3
                                }
                                onClick={this.handleChange}
                              />
                              <label
                                className="mb-0 w-100 py-2 FS_10"
                                htmlFor={each.tagEN}
                              >
                                {each.tagEN}
                              </label>
                            </div>
                          );
                        })}
                        {this.state.count == 1 &&
                        this.state.selectedTags == "" ? (
                          <p className="Errored">Select three of These</p>
                        ) : null}
                      </div>
                      <div className="col-12 mt-3  px-0 RadioToButton Tags">
                        <p className="FS_16 mb-0 Bold">Exam Form</p>
                        <ul class="row Tags RadioToButton px-0 m-0">
                          {console.log("exam", this.state.examform)}

                          {this.state.examform.map((exam) => {
                            return (
                              <li className="text-center px-1 mt-3">
                                <input
                                  type="radio"
                                  id={exam.name}
                                  name="ExamForm"
                                  value={exam.examFromID}
                                  onClick={this.handleChange}
                                />
                                <label
                                  className="w-100 py-1 px-3 FS_10"
                                  htmlFor={exam.name}
                                >
                                  {exam.name}
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                        {this.state.count == 1 && this.state.ExamForm == "" ? (
                          <p className="Errored text-center">
                            Select one of These
                          </p>
                        ) : null}
                      </div>
                      <div className="col-12   px-0 RadioToButton Tags ">
                        <p className="FS_16 Bold my-2">
                          Would you take with him again?
                        </p>
                        <p
                          className="m-0"
                          style={{ color: "red" }}
                          id="chkbox"
                        ></p>
                        <div className="row">
                          <div className="text-center">
                            <input
                              type="radio"
                              id={1}
                              name="again"
                              value={1}
                              onClick={this.handleChange}
                            />
                            <label
                              className="yes-no-radiobtn py-1 px-3 FS_10"
                              htmlFor={1}
                            >
                              Yes
                            </label>
                          </div>
                          <div className="text-center mx-2">
                            {" "}
                            <input
                              type="radio"
                              id={0}
                              name="again"
                              value={0}
                              onClick={this.handleChange}
                            />
                            <label
                              className="yes-no-radiobtn py-1 px-3 FS_10"
                              htmlFor={0}
                            >
                              No
                            </label>
                          </div>
                        </div>
                        {this.state.count == 1 && this.state.again == "" ? (
                          <p className="Errored">Select one of These</p>
                        ) : null}
                      </div>

                      <div className="col-12 px-0 my-3 ">
                        <textarea
                          id="Description"
                          name="Description"
                          placeholder="Share Your experience with Professor&#10;NameX here.."
                          rows="5"
                          className=" p-3"
                          onChange={this.handleChange}
                        ></textarea>
                        {this.state.count == 1 &&
                        this.state.Description == "" ? (
                          <p className="Errored py-0 text-center">
                            Please Give Your Comment
                          </p>
                        ) : null}
                      </div>
                      <div class="col-12 form-group mx-auto mb-4 px-0">
                        <button
                          className=" w-100 button filled_btn py-2"
                          type="Submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default SubjectRateMe;
