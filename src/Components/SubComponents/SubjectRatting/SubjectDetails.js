import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubjectsData from "./SubjectsData";
import SecondNavbar from "../SecondNavbar";
import Profile from "../Shared/ProfilingSubjectMajor";
import User from "../../../Assets/img/user.png";
import HelpfullRating from "../Shared/HelpfullRating";
import GetData from "../../Api/GetData";
import { Spin } from "antd";
import SubjectImage from "../../../Assets/img/subject.png";
import { NavLink } from "react-router-dom";

const SubjectDetails = () => {
  const { SubjectId } = useParams();
  const [subjectMajorData, setSubjectMajorData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const getData = async () => {
    const data = await GetData.SubjectMajorDetails(SubjectId);

    setSubjectMajorData(data);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SecondNavbar />
      <div className="container-fluid">
        <div className="MaxWidth">
          <div className="row">
            {Loading ? (
              <Spin />
            ) : (
              <div className=" row col-11 col-md-10 mx-auto my-5 px-0 ">
                <div className="col-12 col-lg-4 px-0 mt-3">
                  {subjectMajorData && (
                    <Profile
                      subjectID={subjectMajorData.subjectID}
                      majorID={"12"}
                      Img={SubjectImage}
                      Name={subjectMajorData.subjectName}
                      Ratting={subjectMajorData.hardLevel.hardname}
                      Grade={subjectMajorData.avgGrade} //"B+"
                      from="Subject"
                      subjectDescription={subjectMajorData.subjectDescription}
                      Tags={subjectMajorData.bestTags}
                    />
                  )}
                </div>
                <div className="space-between col-12 col-lg-8 mt-3 pt-5 pt-lg-0">
                  <h3 className="mb-0 text-center">Most HelpFull Rating</h3>
                  {subjectMajorData.helpFull !== null ? (
                    <>
                      <HelpfullRating
                        commentID={subjectMajorData.helpFull.commentID}
                        ID={subjectMajorData.helpFull.subjectID}
                        hardness={"d"}
                        Name={"d"}
                        yearTaken={subjectMajorData.helpFull.year}
                        rating={subjectMajorData.helpFull.rating}
                        Feedback={subjectMajorData.helpFull.comment}
                        Subject={"d"}
                        Grade={subjectMajorData.helpFull.grade}
                        Like={subjectMajorData.helpFull.like}
                        Dislike={subjectMajorData.helpFull.dislike}
                        Block={subjectMajorData.helpFull.spamReported}
                        Reply={subjectMajorData.helpFull.numberOfReplies}
                        Replies={[]}
                        Tags={[
                          {
                            Project: JSON.stringify(
                              subjectMajorData.helpFull.project,
                            ),
                          },
                          { HomeWork: subjectMajorData.helpFull.homework },
                          { Exams: subjectMajorData.helpFull.exams },
                          {
                            Again: JSON.stringify(
                              subjectMajorData.helpFull.again,
                            ),
                          },
                        ]}
                        LikedUser={[]}
                        DisLikedUser={[]}
                        BlockedUsers={[]}
                      />
                    </>
                  ) : (
                    <p>No HelpFull Rating Yet</p>
                  )}
                  <div className="my-3 professor-ratingloadmore">
                    <NavLink
                      to={`/SubjectRating/Comments/${subjectMajorData.subjectID}`}
                    >
                      <button>Load More</button>
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectDetails;
