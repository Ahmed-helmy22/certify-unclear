import { useLoaderData, Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrappers/AwardingNewBadgeForm";
import { FormRow } from "../../components";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { useState } from "react";
import Heading from "./../../ui/Heading";
import dayjs from "dayjs";
import "dayjs/locale/en";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const loader = async ({ params }) => {
  const { candidateBadgeId, id } = params;
  try {
    // const { data } = await customFetch.get("/badge/getMyBadgesInList");
    const candidateBadge = await customFetch.get(
      `/provider/viewCandidateBadge/${id}`
    );
    // const  badgeId  = await customFetch.get(`badge/viewBadge/${candidateBadge.data.data.badgeId}`)

    // return { data, candidateBadge ,badgeId};
    return { candidateBadge };
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};

export const action = async ({ request, params }) => {
  const { candidateBadgeId, id } = params;
  //  candidateId, badgeId, grade, issueDate, dueDate, examinerId, internalBadgeNum, note }
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.candidateId = params.id;

  try {
    await customFetch.patch(
      `/provider/updateDeclinedBadges/${params.id}`,
      data
    );
    toast.success("edit badge to candidate successfully");
    return redirect("/dashboard/academy");
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};
// addBadgeToCandidate

const ProviderAwardingBadgeToEditBadge = () => {
  const { candidateBadge } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isLoading, setIsLoading] = useState(false);

  const issuedate = dayjs(candidateBadge.data.data.issueDate, {
    format: "YYYY-MM-DD",
  });
  const duedate = dayjs(candidateBadge.data.data.dueDate, {
    format: "YYYY-MM-DD",
  }).format("MM/DD/YYYY");

  return (
    <Wrapper>
      <Heading as="h2">Edit awarding badge</Heading>
      <Form method="post" encType="multipart/form-data">
        <div className="container">
          <div className="rightContent">
            <FormRow
              name="grade"
              type="text"
              labelText="grade"
              withLabel={true}
              placeHolder="Grade"
              defaultValue={candidateBadge.data.data.grade}
            />
            <FormRow
              name="issueDate"
              type="date"
              labelText="issue date"
              withLabel={true}
              defaultValue={issuedate}
            />
            <FormRow
              name="dueDate"
              type="date"
              labelText="due date"
              withLabel={true}
              defaultValue={duedate}
            />
            <FormRow
              name="examinerId"
              type="text"
              labelText="Approver / Examiner"
              withLabel={true}
              placeHolder="Registration number"
              defaultValue={candidateBadge.data.data.examinerId}
            />
            <span> Authority with power to approve</span>
            <FormRow
              name="internalCertifcate"
              type="text"
              labelText="Internal Certificate Nr. [if not applicable please write N/A]"
              withLabel={true}
              placeHolder="Internal Certificate Nr."
              defaultValue={candidateBadge.data.data.internalCertifcate}
            />
          </div>

          <div className="leftContent">
            <textarea
              id="note"
              name="note"
              rows="10"
              cols="50"
              placeholder="if None, Write NONE"
              defaultValue={candidateBadge.data.data.note}
            ></textarea>

            <button
              type="submit"
              className="btn btn-block form-btn"
              disabled={isSubmitting}
            >
              {isLoading ? "submitting" : "submit"}
            </button>
          </div>
        </div>
      </Form>
    </Wrapper>
  );
};

export default ProviderAwardingBadgeToEditBadge;
