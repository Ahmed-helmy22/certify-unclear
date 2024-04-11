import {
  Name,
  TableRow,
  Action,
  HiddenId,
  Title,
  Published,
  Pending,
} from "../../assets/wrappers/TableWrapper";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link, useNavigation, useParams } from "react-router-dom";
import { useState } from "react";
import AdminApproveModal from "./AdminApproveModal";
import AdminSuspendModal from "./AdminSuspendModal";
import AdminDeleteProviderModal from "./AdminDeleteProviderModal";
day.extend(advancedFormat);

const AdminProvidersInfoRow = ({ provider }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalSuspendActive, setIsModalSuspendActive] = useState(false);
  const [isModalDeleteActive, setIsModalDeleteActive] = useState(false);

  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };

  const suspendModalWork = () => {
    setIsModalSuspendActive(!isModalSuspendActive);
  };

  const deleteModalWork = () => {
    setIsModalDeleteActive(!isModalDeleteActive);
  };
  const params = useParams();
  const [isIdHovered, setIdHovered] = useState(false);
  return (
    <TableRow role="row" style={{ "--num-columns": 6, textAlign: "center" }}>
      <HiddenId
        onMouseEnter={() => setIdHovered(true)}
        onMouseLeave={() => setIdHovered(false)}
      >
        {isIdHovered
          ? provider?._id.substring(0, 18)
          : provider?._id.substring(0, 6)}
      </HiddenId>

      <Name>{provider?.OrganizationName}</Name>
      <Name>{provider.numProviderBadges}</Name>

      <Name>{provider?.country}</Name>
      <Title>
        {provider?.status === "approved" ? (
          <Published>{provider?.status}</Published>
        ) : (
          <Pending>{provider?.status}</Pending>
        )}
      </Title>

      <Action>
        <Link
          className="btn adminAction"
          to={`../provider/view/${provider?._id}`}
        >
          View
        </Link>

        {provider?.status === "approved" && (
          <>
            <Link
              className="btn adminAction"
              to={`../provider/delete/${provider?._id}`}
              onClick={deleteModalWork}
            >
              Delete
            </Link>
          </>
        )}
        {provider?.status !== "approved" && (
          <>
            <Link
              className="btn adminAction"
              onClick={modalWork}
              to={`../provider/approve/${provider?._id}`}
            >
              Approve
            </Link>
          </>
        )}

        {provider?.status !== "suspended" && provider?.status !== "pending" && (
          <>
            <Link
              className="btn adminAction"
              onClick={suspendModalWork}
              to={`../provider/suspend/${provider?._id}`}
            >
              Suspend
            </Link>
          </>
        )}
      </Action>
      {isModalActive ? (
        <AdminApproveModal
          key={provider._id}
          OrganizationName={provider.OrganizationName}
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
          modalWork={modalWork}
        />
      ) : (
        ""
      )}

      {isModalSuspendActive ? (
        <AdminSuspendModal
          key={provider._id}
          OrganizationName={provider.OrganizationName}
          setIsModalSuspendActive={setIsModalSuspendActive}
          isModalSuspendActive={isModalSuspendActive}
          suspendModalWork={suspendModalWork}
        />
      ) : (
        ""
      )}

      {isModalDeleteActive ? (
        <AdminDeleteProviderModal
          key={provider._id}
          name={provider.OrganizationName}
          setIsModalDeleteActive={setIsModalDeleteActive}
          isModalDeleteActive={isModalDeleteActive}
          deleteModalWork={deleteModalWork}
        />
      ) : (
        ""
      )}
    </TableRow>
  );
};

export default AdminProvidersInfoRow;
