import {
  Form,
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import Wrapperv2 from "../../assets/wrappers/RegisterAndLoginPageV2";
import bgImage6 from "../../assets/images/undraw_updated_resume_re_7r9j.svg";

import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

import Loading from "../Loading";

import FirstStage from "./Candidate/FirstStage";
import SecondStage from "./Candidate/SecondStage";
import ThirdStage from "./Candidate/ThirdStage";
import FourthStage from "./Candidate/FourthStage";
import FivtshStage from "./Candidate/FivtshStage";
import SixthStage from "./Candidate/SixthStage";

const INITIAL_DATA = {
  userAgreement: false,
  firstName: "",
  middleName: "",
  familyName: "",
  DOBirth: "",
  gender: "",
  phoneNumber: "",
  occupation: "",
  qualification: "",
  address: "",
  city: "",
  country: "",
  POBox: "",
  email: "",
  confirmEmail: "",
  PassportNumber: "",

  password: "",
  confirmPassword: "",

  leeRegNumber: "",
  leeWebsiteId: "",
  leeCompany: "",
  mycertWebsiteId: "",
  myCertRegNumber: "",
  itraWebsiteId: "",
  itraRegNumber: "",
  itraName: "",

  candidatePassportPhoto: null,
  candidateProfilePhoto: null,
  candidateVerificationPhoto: null,
};

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/externalBadge/allWebsites");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const RegisterCandidateV2 = () => {
  const { data } = useLoaderData();
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState(INITIAL_DATA);
  const [inputErrors, setInputErrors] = useState({});

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";

  const [checkAgreement, setCheckAgreement] = useState(
    INITIAL_DATA.userAgreement
  );

  const handleCheckUserAgrrement = () => {
    setCheckAgreement(!checkAgreement);
   };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    // Validate required fields
    if (!value && name !== "userAgreement") {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required",
      }));
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
    if (type === "file") {
      const file = e.target.files[0];
      setInputData({
        ...inputData,
        [name]: file,
      });
    } else {
      setInputData({
        ...inputData,
        [name]: value,
      });
    }
    if (name === "userAgreement") {
      setCheckAgreement(!checkAgreement);
     }
  };
  const FormPageTitle = [
    "page-1",
    "page-2",
    "page-3",
    "page-4",
    "page-5",
    "page-6",
  ];
  const btnNextPage = (e) => {
    e.preventDefault();
    if (page < FormPageTitle.length - 1) {
      setPage((currPage) => currPage + 1);
    } else {
      setPage(FormPageTitle.length - 1);
    }
  };

  const btnPrevPage = (e) => {
    e.preventDefault();
    if (page > 0) {
      setPage((currPage) => currPage - 1);
    } else {
      setPage(0);
    }
  };

  const handleSubmit = async (e) => {
    // Validate all required fields
    const requiredFields = [
      "firstName",
      "middleName",
      "familyName",
      "DOBirth",
      "gender",
      "phoneNumber",
      "address",
      "city",
      "country",
      "POBox",
      "email",
      "confirmEmail",
      "PassportNumber",
      "password",
      "confirmPassword",
      "qualification",
      "occupation",
    ];
    const errors = {};
    requiredFields.forEach((field) => {
      if (!inputData[field]) {
        errors[field] = "This field is required";
      }
    });
    setInputErrors(errors);

    // If there are errors, stop submission
    if (Object.keys(errors).length > 0) {
      return;
    }
    e.preventDefault();

    const formData = new FormData();
    formData.append("userAgreement", checkAgreement);
    formData.append("firstName", inputData.firstName);
    formData.append("middleName", inputData.middleName);
    formData.append("familyName", inputData.familyName);
    formData.append("DOBirth", inputData.DOBirth);
    formData.append("gender", inputData.gender);
    formData.append("phoneNumber", inputData.phoneNumber);
    formData.append("address", inputData.address);
    formData.append("city", inputData.city);
    formData.append("country", inputData.country);
    formData.append("POBox", inputData.POBox);
    formData.append("email", inputData.email);
    formData.append("confirmEmail", inputData.confirmEmail);
    formData.append("PassportNumber", inputData.PassportNumber);
    formData.append("password", inputData.password);
    formData.append("confirmPassword", inputData.confirmPassword);
    formData.append("qualification", inputData.qualification);
    formData.append("occupation", inputData.occupation);

    formData.append("leeWebsiteId", inputData.leeWebsiteId);
    formData.append("leeRegNumber", inputData.leeRegNumber);
    formData.append("leeCompany", inputData.leeCompany);

    formData.append("myCertRegNumber", inputData.myCertRegNumber);
    formData.append("mycertWebsiteId", inputData.mycertWebsiteId);

    formData.append("itraWebsiteId", inputData.itraWebsiteId);
    formData.append("itraRegNumber", inputData.itraRegNumber);
    formData.append("itraName", inputData.itraName);

    // Append candidatePassportPhoto and candidateVerificationPhoto
    formData.append("candidateProfilePhoto", inputData.candidateProfilePhoto);
    formData.append("candidatePassportPhoto", inputData.candidatePassportPhoto);
    formData.append(
      "candidateVerificationPhoto",
      inputData.candidateVerificationPhoto
    );

    try {
      await customFetch.post("/candidate/signup", formData);
      toast.success("Registration successful");
      navigate("/register/email-verification");
    } catch (error) {
      toast.error(error?.inputErrors);
      toast.error(error?.response?.data?.message);
      toast.error(inputErrors);

      // Handle submission error
      setInputData(INITIAL_DATA);
      navigate("/register/candidate");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  const FormDisplay = () => {
    if (page === 0) {
      return (
        <FirstStage
          inputData={inputData}
          setInputData={setInputData}
          handleInputChange={handleInputChange}
          inputErrors={inputErrors}
        />
      );
    } else if (page === 1) {
      return (
        <SecondStage
          inputData={inputData}
          setInputData={setInputData}
          handleInputChange={handleInputChange}
          inputErrors={inputErrors}
        />
      );
    } else if (page === 2) {
      return (
        <ThirdStage
          inputData={inputData}
          setInputData={setInputData}
          handleInputChange={handleInputChange}
        />
      );
    } else if (page === 3) {
      return (
        <FourthStage
          data={data}
          inputData={inputData}
          setInputData={setInputData}
          handleInputChange={handleInputChange}
        />
      );
    } else if (page === 4) {
      return (
        <FivtshStage
          inputData={inputData}
          setInputData={setInputData}
          handleInputChange={handleInputChange}
        />
      );
    } else if (page === 5) {
      return (
        <SixthStage
          checkAgreement={checkAgreement}
          handleCheckUserAgrrement={handleCheckUserAgrrement}
          inputData={inputData}
          setInputData={setInputData}
          handleInputChange={handleInputChange}
        />
      );
    }
  };
  return (
    <Wrapperv2>
      <div className="bgImag">
        <img src={bgImage6} alt="" />
      </div>
      <Wrapper>
        <div className="wrapper">
          <Form
            method="post"
            className="form"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h3 style={{ textAlign: "center" }}>Candidate Registration</h3>
            <hr />
            {FormDisplay()}

            <div className="action-btn">
              {checkAgreement && (
                <>
                  <button className="btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "submitting" : "submit"}
                  </button>
                </>
              )}

              <div className="page-btn">
                <button className="btn" onClick={btnPrevPage}>
                  Prev
                </button>

                <button className="btn" onClick={btnNextPage}>
                  next
                </button>
              </div>
            </div>

            <p>
              Already a member ?
              <Link to="/login" className="member-btn">
                Login
              </Link>
            </p>
          </Form>
        </div>
      </Wrapper>

      <></>
    </Wrapperv2>
  );
};

export default RegisterCandidateV2;
