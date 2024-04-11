import Wrapper from "../assets/wrappers/Badge";
import { Link, useNavigation } from "react-router-dom";
import { useState } from "react";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import BadgeInfoWithoutLogin from "./BadgeInfoWithoutLogin";
day.extend(advancedFormat);

const BadgeWithoutLogin = ({ documents, _id }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isModalActive, setIsModalActive] = useState(false);

  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };

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
                <BadgeInfoWithoutLogin
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
                    <Link
                      to={`../view-badge/${item._id}`}
                      className="btn edit-btn"
                    >
                      View
                    </Link>
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
};

export default BadgeWithoutLogin;
