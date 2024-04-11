import { useState } from "react";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
 import WrapperSelect from "../../assets/wrappers/checkBoxWrapper";
import FormRowSelect from "../../components/FormRowSelect";
import FormRow from "../../components/FormRow";
import { toast } from "react-toastify";
import { ACADEMY_PROVIDER_TYPE } from "../../utils/constants";
import customFetch from "./../../utils/customFetch";
import Country from "../../components/Country";
import CountryCallingCode from "../../components/CountryCallingCode";
import { Logo } from "../../components";
import { FaHome, FaPhoneAlt, FaUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { GiEgyptianProfile } from "react-icons/gi";
import CountrySecond from "../../components/CountrySecond";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await customFetch.post("/provider/signup", formData);
    toast.success("Registration successful");
    return redirect("/register/email-verification");
  } catch (error) {
    //  error message
    toast.error(error?.response?.data?.message);

    return error;
  }
};

const RegisterAcademyV2 = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [checkAgreement, setCheckAgreement] = useState(false);
  const handleCheckUserAgrrement = () => {
    setCheckAgreement(!checkAgreement);
  };

  return (
    <div>
      <nav>
        <Logo />
      </nav>
      <div className="content">
        <div className="page">
          {/* <img src={image} alt="" /> */}
        </div>

        <div>
          <Form
            method="post"
            className="registeration-form"
            encType="multipart/form-data"
          >
            <h3 style={{ textAlign: "center" }}>Academy Registration</h3>

            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="OrganizationName"
                  placeholder="Organization Name"
                  required
                />

                <FaUser className="icon" />
              </div>
              <div className="input-field">
                <label htmlFor="logo" className="label-image">
                  Academy logo
                </label>
                <input
                  type="file"
                  name="candidateProfilePhoto"
                  accept="image/*"
                  placeholder="Profile image"
                  required
                  className="file-image"
                />

                <GiEgyptianProfile className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="address"
                  placeholder="Organization address"
                  required
                />
                <FaUser className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="city"
                  placeholder="Organization city"
                  required
                />
                <FaUser className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <CountrySecond />
                <FaHome className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="url"
                  name="website"
                  placeholder="academy website"
                  required
                />
                <FaUser className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <input
                  type="number"
                  name="phoneNumber"
                  placeholder="phone number"
                  required
                />
                <FaPhoneAlt className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="number"
                  name="POBox"
                  placeholder="POBox"
                  required
                />
                <FaPhoneAlt className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <label htmlFor="logo" className="label-image">
                  admin Profile Photo
                </label>
                <input
                  type="file"
                  name="adminProfilePhoto"
                  accept="image/*"
                  placeholder="admin Profile image"
                  required
                  className="file-image"
                />

                <GiEgyptianProfile className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="firstName"
                  placeholder="first Name"
                  required
                />
                <FaUser className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="middleName"
                  placeholder="middle Name"
                  required
                />
                <FaUser className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="familyName"
                  placeholder="family Name"
                  required
                />
                <FaUser className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <div className="gender-input">
                  <span>Male</span>
                  <div className="input-field">
                    <input
                      type="radio"
                      name="adminGender"
                      className="gender"
                      value="male"
                    />
                  </div>
                  <span>Female</span>
                  <div className="input-field">
                    <input
                      type="radio"
                      name="adminGender"
                      className="gender"
                      value="female"
                    />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <input type="date" name="DOBirth" placeholder="Date of birth" />
                <SlCalender className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="adminRole"
                  placeholder="Admin role"
                  required
                />
                <FaUser className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="number"
                  name="adminPhoneNumber"
                  placeholder="admin phone number"
                  required
                />
                <FaPhoneAlt className="icon" />
              </div>
            </div>

            <div className="input-box">
              <div className="input-field">
                <input
                  type="number"
                  name="adminPOBox"
                  placeholder="admin POBox"
                  required
                />
                <FaPhoneAlt className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="number"
                  name="adminPassportNumber"
                  placeholder="admin Passport Number"
                  required
                />
                <FaPhoneAlt className="icon" />
              </div>
            </div>

            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="adminCity"
                  placeholder="admin city"
                  required
                />
                <FaUser className="icon" />
              </div>
              <div className="input-field">
                <CountrySecond name="adminCountry" />
                <FaHome className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <label htmlFor="logo" className="label-image">
                  admin Profile Photo
                </label>
                <input
                  type="file"
                  name="adminVerificationPhoto"
                  accept="image/*"
                  placeholder="admin Verification Photo"
                  required
                  className="file-image"
                />

                <GiEgyptianProfile className="icon" />
              </div>
              <div className="input-field">
                <label htmlFor="logo" className="label-image">
                  admin Profile Photo
                </label>
                <input
                  type="file"
                  name="adminPassportPhoto"
                  accept="image/*"
                  placeholder="admin Passport Photo"
                  required
                  className="file-image"
                />

                <GiEgyptianProfile className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <input type="email" placeholder="email" required name="email" />
                <MdEmail className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="confrim email"
                  name="confirmEmail"
                  required
                />
                <MdEmail className="icon" />
              </div>
            </div>

            <div className="input-box">
              <div className="input-field">
                <input
                  type="password"
                  placeholder="password"
                  required
                  name="password"
                />
                <RiLockPasswordFill className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="confirm password"
                  required
                  name="confirmPassword"
                />
                <RiLockPasswordFill className="icon" />
              </div>
            </div>
            <div>
              <div className="input-box-agreement">
                <input
                  type="checkbox"
                  name="userAgreement"
                  label="checkLicence"
                  onChange={handleCheckUserAgrrement}
                  value={checkAgreement ? true : false}
                  checked={checkAgreement}
                />
                <label>
                  By Checking this Box, you agree to the terms of our
                  <span className="licenceAgreement">
                    End-User-License Agreement (EULA)
                  </span>
                </label>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
   );
};

export default RegisterAcademyV2;
