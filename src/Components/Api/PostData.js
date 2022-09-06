import axios from "axios";
import { message } from "antd";

class PostData {
    constructor() {
        this.result = [];
    }
    BookAdd = (data, mthd) => {
      const res = async () => {
        const resp = await axios
          .post("user/BookStore/add", data)
          .catch(function (error) {
            console.log(error);
          });
        this.result = resp;
        console.log(resp);
        return resp;
      };
      return res();
    };
    ServiceAdd = (data, mthd) => {
      const res = async () => {
        const resp = await axios
          .post("user/ServiceProvider/add", data)
          .catch(function (error) {
            console.log(error);
          });
        this.result = resp;
        console.log(resp);
        return resp;
      };
      return res();
    };
    RattingAdd = (data, mthd) => {
      const res = async () => {
        const resp = await axios

          .post("professors/comments/addComment", {
            subjectID: JSON.stringify(data.subjectID),
            profID: data.profID,
            year: data.year,
            grade: data.name, //TODO: need gradeID instead of name
            rating: data.ratting, //TODO: need ratingID instead of ratting
            hardness: data.hardRating, //TODO: need hardLevelID instead of hardRating
            exams: data.ExamForm, //TODO: need ExamFormID instead of ExamForm
            project: data.Project,
            homework: data.Homework,
            attendence: data.Attandance,
            curve: data.curve,
            again: data.again, // must be 1 for true and 0 for false
            style: data.TeachingStyle, //TODO need TeachingStyleID instead of TeachingStyle
            comment: data.Description,
            tags: data.selectedTags,
          })
          .catch(function (error) {
            console.log(error);
          });
        this.result = resp;
        console.log(resp);
        return resp;
      };
      return res();
    };
    SubjectRattingAdd = (data, mthd) => {
      const res = async () => {
        const resp = await axios
          .post("subjects/addComment", {
            subjectID: data.subjectID,
            year: data.year,
            grade: data.name, //TODO: need gradeID instead of name
            rating: data.ratting, //TODO: tobe removed
            hardness: data.hardRating,//TODO: need hardLevelID instead of hardRating
            exams: data.ExamForm, //TODO: need ExamFormID instead of ExamForm
            project: data.Project,
            homework: data.Homework,
            again: data.again, // must be 1 for true and 0 for false
            comment: data.Description,
            tags: data.selectedTags,
          })
          .catch(function (error) {
            console.log(error);
          });
        this.result = resp;
        console.log(resp);
        return resp;
      };
      return res();
    };
    LikeComment = (data, mthd) => {
        const res = async () => {
            const resp = await axios.post('professors/comments/like', {
                commentID:data
            })
                .catch(function (error) {
                    console.log(error);
                });
            this.result = resp;
            console.log(resp)
            return resp;

        }
        return res();
    }

    UnLikeComment = (data, mthd) => {
        const res = async () => {
            const resp = await axios.post('professors/comments/dislike', {
                commentID:data
            })
                .catch(function (error) {
                    console.log(error);
                });
            this.result = resp;
            console.log(resp)
            return resp;

        }
        return res();
    }
    
    BlockComment = (data, mthd) => {
        const res = async () => {
            const resp = await axios.post('professors/comments/report', {
                commentID:data
            })
                .catch(function (error) {
                    console.log(error);
                });
            this.result = resp;
            console.log(resp)
            return resp;

        }
        return res();
    }

    AddProf = (data, mthd) => {
        const res = async () => {
            const resp = await axios.post('professors/submit', {
                majorID:JSON.stringify(data.majorID),
                arName:data.nameAr,
                name:data.profName
            })
                .catch(function (error) {
                    console.log(error);
                });
            this.result = resp;
            console.log(resp)
            return resp;

        }
        return res();
    }
    

}
export default new PostData();