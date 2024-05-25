import React, { useEffect, useState } from "react";
import styles from "./comp.module.css";
import CompDetail from "../components/matchingComponents/CompDetail"; // CompDetail 컴포넌트 import
import ReviewCard from "../components/matchingComponents/ReviewCard"; // ReviwCard 컴포넌트 import
import AskMatching from "../components/matchingComponents/AskMatchingComponent"; //AskMatching 컴포넌트 import
import { Link, useParams } from "react-router-dom";
import { getCompDetail, getReviewList, getTeamDetail, getTeamList } from "../api/comp";
import ErrorComponent from "../components/ErrorComponent";

const CompMatching = () => {
  //공모전 상세 내용
  const { compId } = useParams();
  const [compDetail, setCompDetail] = useState(null);
  const [compReview, setCompReview] = useState([]);
  const [compTeamList, setCompTeamList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const fetchCompDetail = async () => {
      try {
        const response = await getCompDetail(compId);
        setCompDetail(response.data.compInfo);
        setCompTeamList(response.data.teamList);
        setCompReview(response.data.reviewList);
        
        console.log("compDetail: ",compDetail);
        console.log("compTeamList: ",compTeamList);
        console.log("compReview: ",compReview);

        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsError(true);
          setErrorMessage("선택한 공모전이 없어요!");
        } else {
          setIsError(true);
          setErrorMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
      }
    };

    fetchCompDetail();

  }, [compId]);

  

  return (
    
    <div className={styles.container}>
      
      {/* 공모전 상세 정보 */}
      <div className={styles.compDetailContainer}>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <ErrorComponent message={errorMessage} />
        ) : (
          <CompDetail
            image={compDetail.img}
            title={compDetail.name}
            period={compDetail.startDate+"~"+compDetail.endDate}
            daycount={compDetail.endDate-new Date()}
            organization={compDetail.organization}
            theme={compDetail.theme}
            qualification={compDetail.eligibillty}
            apply={compDetail.applicationMethod}
            awards={compDetail.reward}
            inquiry={compDetail.contact}
            link={compDetail.link}
          />
        )}
      </div>

      {/* 공모전 후기 */}
      <div className={styles.reviewContainer}>
        <div className={styles.reviewHeader}>
          <h2 className={styles.reviewTitle}>공모전 후기</h2>
          <Link to={`/comp/${compId}/reviews`} className={styles.moreReviews}>
            더보기
          </Link>
        </div>

        <div className={styles.reviews}>
          {compReview.slice(0,3).map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>

      {/* 공모전 매칭 선택 질문 */}
      <div>
        <AskMatching
          teamlist = {compTeamList||[]}
        ></AskMatching>
      </div>
    </div>
  );
};

export default CompMatching;
