import Wrapper from "../assets/wrappers/Badge";
import BadgeInfo from "./BadgeInfo";
import { RiImageEditLine } from "react-icons/ri";
import { Link, useNavigation } from "react-router-dom";
import EditBadgeModal from "./EditBadgeModal";
import { useState } from "react";

import { useDashboardContext } from "../pages/DashboardLayout";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const BadgesProvider = ({ documents, _id }) => {
   const { user } = useDashboardContext();
   const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isModalActive, setIsModalActive] = useState(false);

  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };
 
  if (user.role === "provider") {
    return (
      <Wrapper>
        <div>
          <h3 className="heading"> Year {_id} </h3>
        </div>
        <hr />
        <div className="content">
          {documents.map((item) => {
            const date = day(item.createdAt).format("MMM Do, YYYY");
            return (
              <div className="badges" key={item._id}>
                <div className="editImageIcon">
                  <Link
                    className="icon"
                    to={`/dashboard/academy/all-badges/edit-badge-image/${item._id}`}
                    onClick={modalWork}
                  >
                    <RiImageEditLine size={20} />
                  </Link>
                  <p className="editImageText">edit image</p>
                </div>

                <div className="badges-center">
                  <BadgeInfo badgePhoto={item.badgePhoto} />
                </div>
                <div className="badges-info">
                  <h5>{item.title}</h5>
                  <p>{item.department}</p>
                </div>
                <div>
                  {user.role === "provider"  ? ' ':  <p>{date}</p>}
                 
                </div>
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
                        to={`/dashboard/academy/edit-badge/${item._id}`}
                        className="btn edit-btn"
                      >
                        Edit
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/dashboard/academy/edit-badge/${item._id}`}
                        className="btn edit-btn"
                      >
                        View
                      </Link>
                    </>
                  )}
                </footer>
                {isModalActive ? (
                  <EditBadgeModal
                    key={item._id}
                    setIsModalActive={setIsModalActive}
                    isModalActive={isModalActive}
                    modalWork={modalWork}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </Wrapper>
    );
  }

  if (user.role === "candidate") {
    return (
      <Wrapper>
        <div>
          <h3 className="heading"> Year {_id} </h3>
        </div>
        <hr />
        <div className="content">
          {documents.map((item) => {
            const date = day(item.createdAt).format("MMM Do, YYYY");
            return (
              <div className="badges" key={item._id}>
                <div className="badges-center">
                  <BadgeInfo
                    badgePhoto={item.badge[0].badgePhoto}
                    badgeStatus={item.status}
                  />
                </div>
                <div className="badges-info">
                  <h5>{item.title}</h5>
                  <p>{item.department}</p>
                  <h5>{item.grade}</h5>
                </div>
                <div>
                  <p>{date}</p>
                </div>
                <footer
                  className="actions"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    paddingTop: ".5rem",
                  }}
                >
                  <>
                    {item.status === "published" ? (
                      <Link to={`../view-badge/${item._id}`}className="btn edit-btn">View</Link>
                    ) : (
                      ""
                    )}
                  </>
                </footer>
                
              </div>
            );
          })}
        </div>
      </Wrapper>
    );
  }
};

export default BadgesProvider;
