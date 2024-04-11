import { FileUploader, FormRow } from "..";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { useState } from "react";
import DeleteModal from "../DeleteModal";
import BackOnePageButton from "../BackOnePageButton";

export const loader = async ({ params }) => {
  // its response in log the whole array of the same year need to get only the badge only
  try {
    const { data } = await customFetch.get(
      `/externalBadge/website/${params.websitId}`
    );
    return { data };
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const file = formData.get("newWebsitePhoto");
  console.log(file);
  console.log(formData);
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post(
      `/externalBadge/editWebsite/${params.websitId}`,
      formData
    );
    toast.success("external badge edit succesfully");
    return redirect("/dashboard/admin/manage-external");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditExternalBadge = () => {
  const { data } = useLoaderData();
  console.log(data);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [isModalActive, setIsModalActive] = useState(false);

  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };

  return (
    <Wrapper>
      <BackOnePageButton />
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">edit external badge</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="title"
            defaultValue={data.externalWebsite.title}
          />
          <FormRow
            type="file"
            name="newWebsitePhoto"
            accept="image/png"
            labelText="badge Photo accept image/png only"
            placeholder="image/png"
            withLabel={true}
          />

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
      </Form>

      {isModalActive ? (
        <DeleteModal
          id={data.externalWebsite._id}
          title={data.externalWebsite.title}
          deleteUrl={"manage-external/delete-external-badge"}
          currentUrl={`manage-external/update-external-badge/${data.externalWebsite._id}`}
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

export default EditExternalBadge;
