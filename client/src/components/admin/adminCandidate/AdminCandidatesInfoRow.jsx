import {
  Name,
  TableRow,
  Title,
  Action,
  Published,
  Declined,
  Pending,
  Img,
  HiddenId,
} from "../../../assets/wrappers/TableWrapper";
import profileImag from "../../../assets/images/profile-avatar.png";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import AdminCandidatesDeleteModal from "./AdminCandidatesDeleteModal";
import AdminCandidatesSuspendModal from "./AdminCandidatesSuspendModal";
import AdminCandidatesApproveModal from "./AdminCandidatesApproveModal";

day.extend(advancedFormat);

const AdminCandidatesInfoRow = ({ candidate, searchValues }) => {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  const [isCandidatesModalActive, setIsCandidatesModalActive] = useState(false);
  const [isCandidatesModalSuspendActive, setIsCandidatesModalSuspendActive] =
    useState(false);
  const [isCandidatesModalDeleteActive, setIsCandidatesModalDeleteActive] =
    useState(false);

  // approve
  const modalCandidatesWork = () => {
    setIsCandidatesModalActive(!isCandidatesModalActive);
  };

  //  suspend
  const suspendCandidatesModalWork = () => {
    setIsCandidatesModalSuspendActive(!isCandidatesModalSuspendActive);
  };

  // delete
  const deleteCandidatesModalWork = () => {
    setIsCandidatesModalDeleteActive(!isCandidatesModalDeleteActive);
  };

    const [isIdHovered, setIdHovered] = useState(false);
  return (
    <TableRow role="row" style={{ "--num-columns": 6 }}>
      <HiddenId
        onMouseEnter={() => setIdHovered(true)}
        onMouseLeave={() => setIdHovered(false)}
      >
        {isIdHovered
          ? candidate._id.substring(0, 18)
          : candidate._id.substring(0, 6)}
      </HiddenId>
       <Img
        src={
          candidate?.candidateProfilePhoto
            ? `${candidate?.candidateProfilePhoto}`
            : profileImag
        }
        alt=""
        style={{ width: 50, height: "50px", borderRadius: "50%" }}
      />
      <Name>
        {candidate?.firstName.toUpperCase()} {candidate?.familyName.toUpperCase()}
      </Name>

      <Title>{candidate.numCandidateBadges}</Title>

      {candidate.status === "pending" ? (
        <Pending>{candidate.status}</Pending>
      ) : candidate.status === "suspended" ? (
        <Declined>{candidate.status}</Declined>
      ) : (
        <Published>{candidate.status}</Published>
      )}

      <Action>
        <Link
          type="button"
          className="btn adminAction"
          to={`../candidates/view/${candidate._id}`}
        >
          View
        </Link>

       
          <>
            <button
              type="button"
              className="btn adminAction deleteBtn"
              onClick={deleteCandidatesModalWork}
            >
              Delete
            </button>
          </>
       
        {candidate.status !== "approved" && (
          <>
            <button
              type="button"
              className="btn adminAction"
              onClick={modalCandidatesWork}
            >
              Approve
            </button>
          </>
        )}
        {candidate?.status !== "suspended" && candidate?.status !== 'pending' && (
          <>
            <button
              type="button"
              className="btn adminAction"
              onClick={suspendCandidatesModalWork}
            >
              Suspend
            </button>
          </>
        )}
        
      </Action>

      {/* approve */}
      {isCandidatesModalActive ? (
        <AdminCandidatesApproveModal
          id={candidate._id}
          name={candidate.firstName}
          setIsCandidatesModalActive={setIsCandidatesModalActive}
          isCandidatesModalActive={isCandidatesModalActive}
          modalCandidatesWork={modalCandidatesWork}
        />
      ) : (
        ""
      )}

      {/* suspend */}
      {isCandidatesModalSuspendActive ? (
        <AdminCandidatesSuspendModal
          id={candidate._id}
          name={candidate.firstName}
          setIsCandidatesModalSuspendActive={setIsCandidatesModalSuspendActive}
          isCandidatesModalSuspendActive={isCandidatesModalSuspendActive}
          suspendCandidatesModalWork={suspendCandidatesModalWork}
        />
      ) : (
        ""
      )}

      {/* delete */}
      {isCandidatesModalDeleteActive ? (
        <AdminCandidatesDeleteModal
          id={candidate._id}
          name={candidate.firstName}
          setIsCandidatesModalDeleteActive={setIsCandidatesModalDeleteActive}
          isCandidatesModalDeleteActive={isCandidatesModalDeleteActive}
          deleteCandidatesModalWork={deleteCandidatesModalWork}
        />
      ) : (
        ""
      )}
    </TableRow>
  );
};

export default AdminCandidatesInfoRow;
