import BadgeInfo from "./BadgeInfo";
import { RiImageEditLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import EditBadgeModal from "./EditBadgeModal";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useDashboardContext } from "../pages/DashboardLayout";
import { useState } from "react";
day.extend(advancedFormat);

const CandidateBadgeInternalExternal = ({ badge }) => {
  const { user } = useDashboardContext();

   const dueDate = day(badge?.dueDate).format("MMM Do, YYYY");
  const issueDate = day(badge?.issueDate).format("MMM Do, YYYY");
  const [isModalActive, setIsModalActive] = useState(false);
  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };
  const { title } = badge
  function getFirstCharForEachWord(title) {
    // Split the input string into an array of words
    const words = title.split(" ");

    // Map over the words array and extract the first character of each word
    const firstChars = words.map((word) => word.charAt(0));

    // Join the extracted characters into a string
    const result = firstChars.join("");
     return  <h1>{result}</h1>;
  }
  if (user.role === "provider") {
    return (
      <div className="content">
        <div key={badge._id}>
          <div className="badges">
            <div className="editImageIcon">
              <Link
                className="icon"
                to={`/dashboard/academy/all-badges/edit-badge-image/${badge._id}`}
                onClick={modalWork}
              >
                <RiImageEditLine size={20} />
              </Link>
              <p className="editImageText">edit image</p>
            </div>

            <div className="badges-center">
              <BadgeInfo badgePhoto={badge.photo} badge={badge} />
            </div>
            <div className="badges-info">
              <h5>{badge?.title}</h5>
              <p>{badge?.department}</p>
            </div>
            <div>{user.role === "provider" ? " " : <p>{issueDate}</p>}</div>
            <footer
              className="actions"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingTop: ".5rem",
              }}
            >
              {user.role === "provider" ? (
                <>
                  <Link
                    to={`/dashboard/academy/edit-badge/${badge._id}`}
                    className="btn edit-btn"
                  >
                    Edit
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/dashboard/academy/edit-badge/${badge._id}`}
                    className="btn edit-btn"
                  >
                    View
                  </Link>
                </>
              )}
            </footer>
            {isModalActive ? (
              <EditBadgeModal
                key={badge._id}
                setIsModalActive={setIsModalActive}
                isModalActive={isModalActive}
                modalWork={modalWork}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }

  if (user.role === "candidate") {
    return (
      <div className="content">
        <div className="badges">
          <div className="badges-center">
            <BadgeInfo badgePhoto={badge?.photo} badge={badge} />
          </div>
          <div className="badges-info">
            <h5 style={{wordBreak: 'breakAll' , fontSize: '1.2rem'}}>{badge?.title}</h5>
            <p>{badge?.badgeDepartment}</p>
             {/* <h5>{badge?.source}</h5> */}
            {/* <h5>{issueDate}</h5> */}
          </div>
          <div>
            <p>{dueDate}</p>
          </div>
          <footer
            className="actions"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              paddingTop: ".5rem",
            }}
          >
            {/* <>
              {badgesPerYear?.status === "published" ? (
                <Link
                  to={`../view-badge/${badgesPerYear._id}`}
                  className="btn edit-btn"
                >
                  View
                </Link>
              ) : (
                ""
              )}
            </> */}
          </footer>
        </div>
      </div>
    );
  }
};

export default CandidateBadgeInternalExternal;
