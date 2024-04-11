import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { useState } from "react";
import DeleteModal from "../../components/DeleteModal";

export const loader = async ({ params }) => {
  // its response in log the whole array of the same year need to get only the badge only
  try {
    const { data } = await customFetch.get(
      `/badge/viewBadge/${params.badgeId}`
    );
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/academy/all-badges");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  if (data.title.length < 2) {
    errors.msg = "The Title shall contain more than 2 characters";
    toast.error(errors.msg);
    return errors;
  }
  if (data.department.length < 2) {
    errors.msg = "The department shall contain more than 2 characters";
    toast.error(errors.msg);
    return errors;
  }
  let pattern = /^[a-zA-Z0-9\s]+$/;

  if (!pattern.test(data.title) || !pattern.test(data.department)) {
    errors.msg = "Shall not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }

  try {
    await customFetch.patch(`/badge/updateBadge/${params.badgeId}`, data);
    toast.success(" badge edit succesfully");
    return redirect("/dashboard/academy/all-badges");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditBadge = () => {
  const { badge } = useLoaderData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [isModalActive, setIsModalActive] = useState(false);

  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit badge</h4>
        <div className="form-center">
          <FormRow type="text" name="title" defaultValue={badge.title} />
          <FormRow
            type="text"
            name="department"
            defaultValue={badge.department}
          />

          <div>
            <button
              type="submit"
              className="btn btn-block form-btn "
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting..." : "submit"}
            </button>
            <button
              type="button"
              className="btn btn-block form-btn "
              onClick={modalWork}
            >
              Delete
            </button>
          </div>
        </div>
      </Form>

      {isModalActive ? (
        <DeleteModal
          id={badge._id}
          title={badge.title}
          deleteUrl={"delete-badge"}
          currentUrl={"edit-badge"}
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
          modalWork={modalWork}
        />
      ) : (
        ""
      )}
    </Wrapper>
  );
};

export default EditBadge;
