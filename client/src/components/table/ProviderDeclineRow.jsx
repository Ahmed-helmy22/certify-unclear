import {
  Name,
  TableRow,
  Title,
  HiddenId,
  SmallActionSize,
} from "../../assets/wrappers/TableWrapper";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "../DeleteModal";
day.extend(advancedFormat);

function ProviderDeclineRow({ declineBadge }) {
  const [isModalActive, setIsModalActive] = useState(false);
  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };
  const {
    candidateFamilyName,
    candidateFirstName,
    examinerFirstName,
    examinerLastName,
    candidateId,
    _id,
    candidateDateOfBirth,
  } = declineBadge;

  const dob = day(candidateDateOfBirth).format("MMM Do, YYYY");
  const lcaotion = useLocation();
  return (
    <TableRow role="row" style={{ "--num-columns": 5 }}>
      <Name>
        {candidateFirstName} {candidateFamilyName}
      </Name>
      <HiddenId>{candidateId}</HiddenId>

      <Title>{dob}</Title>
      <Name>
        {examinerFirstName} {examinerLastName}
      </Name>

      <SmallActionSize>
        <Link
          type="button"
          to={`/dashboard/academy/edit-awarde-badge/${candidateId}/${_id}`}
          className="btn adminAction"
        >
          edit
        </Link>

        {lcaotion?.search.length === 0 ? (
          <Link
            className="btn adminAction"
            onClick={modalWork}
            to={`/dashboard/academy/declined-badges/delete-declined-badge/${_id}/`}
          >
            Delete
          </Link>
        ) : (
          <Link
            className="btn adminAction"
            to={`/dashboard/academy/declined-badges`}
          >
            Delete
          </Link>
        )}
      </SmallActionSize>
      {isModalActive ? (
        <DeleteModal
          id={_id}
          title="Candidate-Badge"
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
          modalWork={modalWork}
          currentUrl="declined-badges"
          deleteUrl={`../academy/declined-badges/delete-declined-badge`}
        />
      ) : (
        ""
      )}
    </TableRow>
  );
}

export default ProviderDeclineRow;
