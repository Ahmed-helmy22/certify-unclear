import {Wrapper , SupportedImage} from "../../assets/wrappers/ProviderProfileWrapper";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import Heading from "../../ui/Heading";
import profileImage from '../../assets/images/profile-avatar.png'
import passportImage from '../../assets/images/passprotSample.jpeg'

import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
day.extend(advancedFormat);

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/admin/viewProvider/${params.userId}`
    );
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    redirect("dashboard/admin/provider");
    return error;
  }
};
const AdminViewProviderProfile = () => {
  const { data } = useLoaderData();
  console.log(data);
   const navigate = useNavigate();
  const date = day(data?.DOBirth).format("MMM Do, YYYY");

  const handleBackClick = () => {
    // Navigate back to the previous page
    navigate(-1);
  };
  return (
    <>
      <div
        className="closeExaminerbtn"
        style={{ display: "flex", gap: "2rem", justifyContent: "end" }}
      >
        <Link
          className="btn closBtnExaminer"
          to={`../provider/edit/${data._id}`}
        >
          Edit
        </Link>
        <Link className="btn closBtnExaminer" onClick={handleBackClick}>
          Back
        </Link>
      </div>

      <Wrapper>
        <header>
          <div className="main-icon">
            {`${data?.OrganizationName}`.charAt(0)}
          </div>
          <div className="info">
            <h5>{data?.OrganizationName}</h5>
            <p>OGS</p>
          </div>
        </header>
        <div className="content">
          <div className="content-center">
            <div style={{width:'100%'}}>
              <img src={data?.logo ? `${data?.logo}`  : profileImage} width={300}/>
            </div>
          </div>
          <div className="">
            <div className="section">
              <p style={{display:'flex' , gap :'1rem'}}> 
                {data?.providerAdminInfo ? data?.providerAdminInfo?.adminRole : 'N/A'}  :  
                <span>
                  {data?.providerAdminInfo ?  data?.providerAdminInfo?.firstName : '| N/A'}
                  {data?.providerAdminInfo ?  data?.providerAdminInfo?.familyName : '| N/A'}
                </span>
              </p>
              <h5>{data?.providerType}</h5>
              <p>
                Contact Person:  {data?.providerAdminInfo ?  data?.providerAdminInfo?.firstName : '| N/A'} {data?.providerAdminInfo ?  data?.providerAdminInfo?.familyName : '| N/A'} <span>   {data?.providerAdminInfo ? data?.providerAdminInfo?.adminRole : 'N/A'}</span>{" "}
              </p>
              <ul className="nav-link">
                <FaFacebookF /> <FaTwitter /> <FaLinkedinIn />
              </ul>

              <p>
                {data?.bio}
              </p>

              <div className="contactUs">
                <ul className="">
                  <li>
                    Tele : <span>{data?.phoneNumber}</span>
                  </li>
                  <li>
                    Email : <span>{data?.email}</span>
                  </li>
                  <li>
                    Address :{" "}
                    <span>
                      {data?.city} - {data?.country} - {data?.address}
                    </span>
                  </li>
                  <li>
                    Website : <span>{data?.webSite}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />

        
      </Wrapper>
      <SupportedImage>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Heading as="h3">passport</Heading>
            <img
              src={data?.providerAdminInfo?.adminPassportPhoto ?  `${data?.providerAdminInfo?.adminPassportPhoto}` : passportImage}
              alt="passport"
              width={"100%"}
              height={300}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Heading as="h3">Admin profile photo</Heading>
            <img
              src={data?.providerAdminInfo?.adminProfilePhoto ? `${data?.providerAdminInfo?.adminProfilePhoto}` : passportImage}
              alt="passport"
              width={"100%"}
              height={300}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Heading as="h3">Admin verification photo</Heading>
            <img
              src={data?.providerAdminInfo?.adminVerificationPhot ? `${data?.providerAdminInfo?.adminVerificationPhoto}` : profileImage}
              alt="passport"
              width={"100%"}
              height={300}
            />
          </div>
        </SupportedImage>
    </>
  );
};

export default AdminViewProviderProfile;
