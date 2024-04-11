import { useState } from "react";
import { RiImageEditLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import WrapperBadge from "../../assets/wrappers/BadgeInfo";
import { EditExternalBadgeModal } from "../../components";

const ExternalBadge = ({ badge }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };

  return (
    <div className="badges">
      <div className="editImageIcon">
        <Link
          className="icon"
          to={`../manage-external/edit/${badge?._id}`}
          onClick={modalWork}
        >
            <RiImageEditLine size={30} color="var(--text-color)"/>
        </Link>
        <p className="editImageText">edit image</p>
      </div>

      <WrapperBadge className="badges-center">
        <img
          src={`${badge?.photo}`}
          className="badge-photo"
          alt=""
          width={100}
        />
      </WrapperBadge>
      <div className="badges-info">
        <h5>{badge?.title}</h5>
      </div>
      <>
        <Link
          to={`/dashboard/admin/manage-external/update-external-badge/${badge?._id}`}
          className="btn edit-btn"
        >
          Edit
        </Link>
      </>
      {isModalActive ? (
        <EditExternalBadgeModal
          key={badge?._id}
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
          modalWork={modalWork}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ExternalBadge;
