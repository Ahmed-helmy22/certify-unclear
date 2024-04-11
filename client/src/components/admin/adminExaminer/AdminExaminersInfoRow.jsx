import {
  Name,
  TableRow,
  Title,
  Action,
  HiddenId,
  Published,
  Declined,
  Pending,
  Img,
} from "../../../assets/wrappers/TableWrapper";
import profileImag from '../../../assets/images/profile-avatar.png';

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link, useNavigation  } from "react-router-dom";
import { useState } from "react";
import AdminExaminerSuspendModal from "./AdminExaminerSuspendModal";
import AdminExaminerDeleteModal from "./AdminExaminerDeleteModal";
import AdminExaminerApproveModal from "./AdminExaminerApproveModal";
day.extend(advancedFormat);

const AdminExaminersInfoRow = ({ examiner }) => {
   console.log(examiner);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [isExaminerModalActive, setIsExaminerModalActive] = useState(false);
  const [isExaminerModalSuspendActive, setIsExaminerModalSuspendActive] =
    useState(false);
  const [isExaminerModalDeleteActive, setIsExaminerModalDeleteActive] =
    useState(false);

  // approve
  const modalExaminerWork = () => {
    setIsExaminerModalActive(!isExaminerModalActive);
  };

  //  suspend
  const suspendExaminerModalWork = () => {
    setIsExaminerModalSuspendActive(!isExaminerModalSuspendActive);
  };

  // delete
  const deleteExaminerModalWork = () => {
    setIsExaminerModalDeleteActive(!isExaminerModalDeleteActive);
  };
  const [isIdHovered, setIdHovered] = useState(false);
  return (
    <TableRow role="row" style={{ "--num-columns": 7 }}>
      <HiddenId
        onMouseEnter={() => setIdHovered(true)}
        onMouseLeave={() => setIdHovered(false)}
      >
        {isIdHovered
          ? examiner._id.substring(0, 18)
          : examiner._id.substring(0, 6)}
      </HiddenId>
      <Img src={examiner?.examinerProfilePhoto ? `${examiner?.examinerProfilePhoto}` : profileImag} alt="" style={{width: 50 , height :'50px' , borderRadius: '50%'}}/>
      <Name>
        {examiner?.firstName} {examiner?.middleName}
      </Name>
      <Name>{examiner?.numCandidateBadges ? examiner?.numCandidateBadges : 'N/A'}</Name>
      <Title>{examiner?.country ? examiner?.country : 'N/A'}</Title>
      <Title>
        {examiner?.status === 'approved' ? <Published>{examiner?.status}</Published>  : <Pending>{examiner?.status}</Pending>}
        
        </Title>
      <Action>
        <Link
          className="btn adminAction"
          to={`../examiner/view/${examiner._id}`}
        >
          View
        </Link>

       

        {examiner?.status !== "approved" && (
          <button
            className="btn adminAction"
            onClick={modalExaminerWork}
            // to={`../examiner-approve/${examiner._id}`}
          >
            Approve
          </button>
        )}
        {examiner?.status !== "suspended" && examiner?.status !== "pending" &&(
          <button
          type="button"

            className="btn adminAction"
            onClick={suspendExaminerModalWork}
            // to={`../examiner-suspend/${examiner._id}`}
          >
            Suspend
          </button>
        )}
  
        {examiner?.status === "approved" && (
          <button
          type="button"
            className="btn adminAction"
            // to={`../examiner-delete/${examiner._id}`}
            onClick={deleteExaminerModalWork}
          >
            Delete
          </button>
        )}
      </Action>

      {/* approve */}
      {isExaminerModalActive ? (
        <AdminExaminerApproveModal
          id={examiner?._id}
          name={examiner?.firstName}
          setIsExaminerModalActive={setIsExaminerModalActive}
          isExaminerModalActive={isExaminerModalActive}
          modalExaminerWork={modalExaminerWork}
        />
      ) : (
        ""
      )}

      {/* suspend */}
      {isExaminerModalSuspendActive ? (
        <AdminExaminerSuspendModal
          id={examiner._id}
          name={examiner.firstName}
          setIsExaminerModalSuspendActive={setIsExaminerModalSuspendActive}
          isExaminerModalSuspendActive={isExaminerModalSuspendActive}
          suspendExaminerModalWork={suspendExaminerModalWork}
        />
      ) : (
        ""
      )}

      {/* delete */}
      {isExaminerModalDeleteActive ? (
        <AdminExaminerDeleteModal
          id={examiner._id}
          name={examiner.firstName}
          setIsExaminerModalDeleteActive={setIsExaminerModalDeleteActive}
          isExaminerModalDeleteActive={isExaminerModalDeleteActive}
          deleteExaminerModalWork={deleteExaminerModalWork}
        />
      ) : (
        ""
      )}
    </TableRow>
  );
};

export default AdminExaminersInfoRow;
