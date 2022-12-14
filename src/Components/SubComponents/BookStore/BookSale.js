import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BooksData from "./BooksData";
import SecondNavbar from "../SecondNavbar";
import Searchbars from "../Shared/Searchbars";
import BookForSale from "./BookForSale";
import BookDescription from "./BookDescription";
import Icon from "../../../Assets/img/icon.png";
import Profile from "../Shared/Profile";
import GetData from "../../Api/GetData";
import { useState } from "react";
import ICON from "../../../Assets/img/icon.png";
import { Spin } from "antd";
const BookSale = () => {
  const { BookId, BookCategory } = useParams();
  const [Loading, setLoading] = useState(true);
  const [noOfElement, setNoOfElement] = useState(3);
  const [bookDetail, setBookDetail] = useState([]);
  const getData = async () => {
    const data = await GetData.BookAllDetail(BookId);
    setBookDetail(data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  {
    console.log("bookDetail", bookDetail);
  }
  const showMoreItems = () => {
    setNoOfElement((prevValue) => prevValue + 3);
  };

  return (
    <>
      <SecondNavbar />
      <Searchbars ButtonValue="Post a Book" from="Bookstore" />
      <div className="container-fluid mt-5 pb-5">
        <div className="MaxWidth">
          <div className="row mt-5 pb-5">
            {Loading ? (
              <Spin />
            ) : (
              <div className="row col-11 mx-auto">
                <div className="col-12 col-lg-8">
                  <div className="btm_bordr">
                    <h4 className="mb-3">For Sale</h4>
                  </div>
                  <div className="mt-3">
                    {bookDetail && (
                      <BookDescription
                        Img={bookDetail.bookImages}
                        Date={bookDetail.modifiedOn}
                        Price={bookDetail.price}
                        Description={bookDetail.description}
                        icon={ICON}
                      />
                    )}
                  </div>
                  <div className="btm_bordr mt-4">
                    <h4 className="mb-3">Related Post</h4>
                  </div>
                  <div className="row">
                    {bookDetail.related.slice(0, noOfElement).map((each) => {
                      return (
                        <BookForSale
                          Img={each.bookImages}
                          Date={each.modifiedOn}
                          Name={each.bookName}
                          icon={ICON}
                        />
                      );
                    })}
                    <div
                      className="col-12 text-center mb-5"
                      onClick={showMoreItems}
                    >
                      <p className="Bold" style={{ cursor: "pointer" }}>
                        load More
                      </p>
                    </div>
                  </div>
                </div>
                <Profile />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookSale;
