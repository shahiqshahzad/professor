import React from "react";
import { NavLink } from "react-router-dom";
import Aplus from "../../../Assets/img/APlus.svg";
import Star from "../../../Assets/img/5Star.svg";
import sad from "../../../Assets/img/sad.svg";
const Profile = (props) => {
  return (
    <>
      <div className="row ShadowBordr Round25 text-center py-3">
        <div className="col-12 px-0">
          <img src={props.Img} alt="" className="d-block mx-auto" width="55%" />
        </div>
        <div className="col-12">
          <h3>{props.Name}</h3>
        </div>
        <div className="col-12">
          <b>{props.subjectDescription}</b>
        </div>

        <div className="row container w-100 ">
          <div className="col-6">
            <div
              style={{
                border: "1px solid black",
                borderRadius: "50%",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3> {props.hardLevel.percentage}</h3>
            </div>
            <div className=" mt-3">Overall Rating</div>
          </div>

          <div className="col-6 ">
            <div
              style={{
                border: "1px solid black",
                borderRadius: "50%",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3 className="Bold">{props.Grade.grade}</h3>
            </div>
            <div className="Bold hs-3 mt-3"> Average Grade</div>
          </div>
        </div>
        <div className="ratting-document-btn container ">
          <NavLink
            className="nav-link m-0 p-0 mx-auto"
            to={`/SubjectRating/RateMe/${props.majorID}/${props.subjectID}`}
          >
            <button className=" w-100 border-0 filled_btn d-block bottom-0">
              Rate Me
            </button>
          </NavLink>
        </div>
        <div className="col-12 mt-3 px-0">
          <p className="FS_20 mb-0 Bold">Top 3 tags or this {props.from}</p>
        </div>
        <div className="ratingbesttags row btn-group col-12 mx-auto px-3">
          {console.log(props.Tags)}
          {props.Tags.length === 0 ? (
            <h4 className="my-4">No Tags</h4>
          ) : (
            props.Tags.map((each) => {
              return (
                <div className="widthMaxContent  mx-auto px-0 mt-3">
                  <button
                    type="button"
                    className=" p-2 FS_12 Bold vhTo50 empty_btn button py-2"
                  >
                    {each}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
