import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  About,
  Contact,
  Error,
  DashboardLayout,
  DashboardLayoutWithoutLogin,
  CheckCertificatesProfile,
  //  registration
  MainRegister,
  VerificationCode,
  RegisterCertifyingAuthority,
  RegisterCandidate,
  RegisterBadgeProvider,
  Login,
  ForgetPassword,
  ResetPassword,
  ChangePassword,
  ChangePasswordCandidate,
  ChangePasswordAcademy,
  ChangePasswordExaminer,
  // candidate
  CandidateProfile,
  CandidateBadges,
  CandidateUpdateInformation,
  // examiner
  ExaminerProfile,
  ExaminerBadgeHolder,
  ExaminerPendingBadges,
  ExaminerPublishedBadges,
  ExaminerUpdateInformation,
  ExaminerToViewThePendingBadge,
  ExaminerViewCandidateProfile,
  ExaminerProfileViewByAdmin,
  // provider
  ProviderProfile,
  ProviderBadgeHolder,
  ProviderPendingRequests,
  ProviderDeclinedBadge,
  ProviderAddNewBadge,
  ProviderAwardingBadgeAdd,
  ProviderBadgeList,
  ProviderAwardingBadgeToAwardBadge,
  ProviderAwardingBadgeProfile,
  ProviderAwardingBadgeList,
  ProviderAwardingBadgeSearch,
  ProviderAwardingBadgeToEditBadge,
  ProviderUpdateInformation,
  CandidateBadgesForProvider,
  ProviderViewCandidateProfile,

  // withoutlogin
  PersonelCertificateProfileWithoutLogin,
  PersonelCertificateAllBadgesWithoutLogin,
  // admin
  AdminProfile,
  AdminCandidateBadges,
  AdminProvidersInfo,
  AdminExaminersInfo,
  AdminCandidatesInfo,
  AdminCandidateEdit,
  AdminExaminerEdit,
  AdminProviderEdit,
  AdminViewCandidateProfile,
  // badge
  EditBadge,
  CertificateCandidate,
  AdminViewProviderProfile,
  // external
  AllExternalCertificates,
  AddExternalCertificate,
  EditExternalBadge,
} from "./pages";
import TermsCondition from "./pages/Auth/Candidate/TermsCondition";

import { action as RegisterAcademyAction } from "./pages/Auth/RegisterBadgeProvider";

import { action as RegisterApproverAction } from "./pages/Auth/RegisterCertifyingAuthority";
import { action as verifiyCodeAction } from "./pages/Auth/VerificationCode";
import { action as loginAction } from "./pages/Auth/Login";
import { action as ForgetPasswordAction } from "./pages/Auth/ForgetPassword";
import { action as ResetPasswordAction } from "./pages/Auth/ResetPassword";

import { action as RegisterCandidateAction } from "./pages/Auth/RegisterCandidate";
import { loader as GetExtenralWebsiteLoader } from "./pages/Auth/RegisterCandidate";

import { action as AddBadgeAction } from "./pages/Provider/ProviderAddNewBadge";
import { loader as DashboardLoader } from "./pages/DashboardLayout";
import { loader as AllBadgesLoader } from "./components/allBadges/AllBadges";
import { loader as EditBadgeLoader } from "./pages/Badge/EditBadge";
import { action as EditBadgeAction } from "./pages/Badge/EditBadge";
import { action as deleteBadgeAction } from "./pages/Badge/DeleteBadge";
import { action as UpdateBadgeImage } from "./components/EditBadgeModal";

// award badge
import { action as getCandidateToAwardBadgeAction } from "./pages/Provider/ProviderAwardingBadgeSearch";
import { loader as getCandidateProfileToAwardLoader } from "./pages/Provider/ProviderAwardingBadge";
import { loader as getBadgesOfAcademyToAward } from "./pages/Provider/ProviderAwardingBadgeToAwardBadge";
import { action as addBadgeToCandidate } from "./pages/Provider/ProviderAwardingBadgeToAwardBadge";
import { loader as GetProfileToAwardLoader } from "./pages/Provider/ProviderAwardingBadgeProfile";

// provider
import { loader as BadgeHolderLoader } from "./pages/Provider/ProviderBadgeHolder";
import { loader as PendingBadgeLoader } from "./pages/Provider/ProviderPendingRequests";
import { loader as DeclinedBadgeLoader } from "./pages/Provider/ProviderDeclinedBadge";
import { loader as EditAwardingBadgeLoader } from "./pages/Provider/ProviderAwardingBadgeToEditBadge";
import { action as EditAwardingBadgeAction } from "./pages/Provider/ProviderAwardingBadgeToEditBadge";
import { action as DeleteDeclinedBadgeCandidateByProviderAction } from "./pages/Provider/DeleteDeclinedBadgeCandidateByProvider";
import { action as ProviderUpdateInformationAction } from "./pages/Provider/ProviderUpdateInformation";

// examiner
import { loader as AllBadgesExaminerLoader } from "./pages/Examiner/ExaminerBadgeHolder";
import { loader as AllPendingBadgesExaminerLoader } from "./pages/Examiner/ExaminerPendingBadges";
import { loader as ExaminerProfileViewByAdminLoader } from "./pages/Examiner/ExaminerProfileViewByAdmin";
import { loader as AllPublishedBadgesExaminerLoader } from "./pages/Examiner/ExaminerPublishedBadges";
import { action as ExaminerToApproveCandidateBadgeAction } from "./pages/Examiner/ExaminerToApproveCandidateBadge";
import { action as ExaminerToDeclineCandidateBadgeAction } from "./pages/Examiner/ExaminerToDeclineCandidateBadge";
import { action as UpdateProfileExaminerAction } from "./pages/Examiner/ExaminerUpdateInformation";
import { loader as ExaminerToViewThePendingBadgeLoader } from "./pages/Examiner/ExaminerToViewThePendingBadge";

import { loader as ExaminerViewCandidateProfileLoader } from "./pages/Examiner/ExaminerViewCandidateProfile";
import { loader as ProviderViewCandidateProfileLoader } from "./pages/Provider/ProviderViewCandidateProfile";

// candidate
import { loader as AllCandidateBadgesLoader } from "./components/candidateBadge/AllBadgesOfCandidate";
import { loader as ViewBadgeToCandidate } from "./pages/Certificate/CertificateCandidate";
import { action as UpdateProfileCandidateAction } from "./pages/Candidate/CandidateUpdateInformation";

// certificate
import { action as CheckCertificatWithoutLoggedInAction } from "./components/CheckCertificateLandingPage";
// import { loader as getCertificateToReview } from "./pages/Provider/ProviderViewCandidateBadge";
import { action as getCandidateWithoutLoggedInAction } from "./pages/Certificate/CheckCertificatesProfile";

import { loader as getCandidateWithoutLoggedInLoader } from "./pages/DashboardLayoutWithoutLogin";
import { loader as getBadgesWithoutLoggedInLoader } from "./components/candidateBadgeWithoutLoginComponenets/AllBadgesWithoutLogin";
import { loader as GetCandidateBadgesloader } from "./pages/Provider/CandidateBadgesForProvider";

//  admin
import { loader as GetCandidateBadges } from "./pages/Admin/AdminCandidateBadges";
import { loader as GetCandidateInfo } from "./pages/Admin/AdminCandidatesInfo";
import { loader as GetExaminersInfo } from "./pages/Admin/AdminExaminersInfo";
import { loader as GetProvidersInfo } from "./pages/Admin/AdminProvidersInfo";
import { loader as AdminViewExaminerProfileLoader } from "./pages/Admin/AdminViewCandidateProfile";

// admin provider action
import { action as AdminApprovalProviderAction } from "./components/admin/AdminApproveModal";
import { action as AdminSuspendProviderAction } from "./components/admin/AdminSuspendModal";
import { action as AdminDeleteProviderAction } from "./components/admin/AdminDeleteProviderModal";
// admine examiner action
import { action as AdminExaminerDeleteAction } from "./components/admin/adminExaminer/AdminExaminerDeleteModal";

import { action as AdminSuspendExaminerAction } from "./components/admin/adminExaminer/AdminSuspendExaminer";
import { action as AdminApproveExaminerAction } from "./components/admin/adminExaminer/AdminApproveExaminer";
// admin candidates
import { action as AdminDeleteCandidateAction } from "./components/admin/adminCandidate/AdminSuspendCandidate";
import { action as AdminSuspendCandidateAction } from "./components/admin/adminCandidate/AdminSuspendCandidate";
import { action as AdminApproveCandidateAction } from "./components/admin/adminCandidate/AdminApproveCandidate";
import { loader as GetCandidatesToUpdateByAdminLoader } from "./pages/Admin/AdminCandidateEdit";
import { action as UpdateCandidatesToUpdateByAdminAction } from "./pages/Admin/AdminCandidateEdit";
import { loader as GetExaminerToUpdateByAdminLoader } from "./pages/Admin/AdminExaminerEdit";
import { action as UpdateExaminerToUpdateByAdminAction } from "./pages/Admin/AdminExaminerEdit";
import { loader as GetProviderToUpdateByAdminLoader } from "./pages/Admin/AdminProviderEdit";
import { action as UpdateProviderToUpdateByAdminAction } from "./pages/Admin/AdminProviderEdit";
import { loader as AdminViewProviderProfileLoader } from "./pages/Admin/AdminViewProviderProfile";

// actinn edit image profile
import { action as EditCandidateProfileImageAction } from "./components/EditCandidateProfileImageModal";
import { action as EditExaminerProfileImageAction } from "./components/EditExaminerProfileImageModal";
import { action as EditProviderProfileImageAction } from "./components/EditProviderProfileImageModal";
import { action as EditAdminProfileImageAction } from "./components/EditAdminProfileImageModal";

// external

import { action as AddExternalCertificateAction } from "./pages/ExternalCertificates/AddExternalCertificate";
import { loader as AllExternalCertificatesLoader } from "./pages/ExternalCertificates/AllExternalCertificates";

import { action as EditExternalBadgeImageAction } from "./components/externalBadges/EditExternalBadgeModal";
import { loader as EditExternalBadgeLoader } from "./components/externalBadges/EditExternalBadge";
import { action as EditExternalBadgeAction } from "./components/externalBadges/EditExternalBadge";
import { action as DeleteExternalBadgeAction } from "./components/externalBadges/DeleteExternalBadge";

import { action as ChangePasswordAdmin } from "./pages/ChangePassword/ChangePassword";
import { action as ChangePasswordCandidateAction } from "./pages/ChangePassword/ChangePasswordCandidate";
import { action as ChangePasswordAcademyAction } from "./pages/ChangePassword/ChangePasswordAcademy";
import { action as ChangePasswordExaminerAction } from "./pages/ChangePassword/ChangePasswordExaminer";

export const checkDefaultThem = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultThem();

const router = createBrowserRouter([
  { path: "terms-conditions", element: <TermsCondition /> },

  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        action: CheckCertificatWithoutLoggedInAction,
      },

      { path: "about-us", element: <About /> },
      { path: "contact-us", element: <Contact /> },
      { path: "login", element: <Login />, action: loginAction },
      {
        path: "check-certificates-profile",
        element: <CheckCertificatesProfile />,
        action: getCandidateWithoutLoggedInAction,
      },

      {
        path: "forget-password",
        element: <ForgetPassword />,
        action: ForgetPasswordAction,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
        action: ResetPasswordAction,
      },
      // shwo certficaet only
      {
        path: "certificate/:candidateBadgeId",
        element: <CertificateCandidate />,
        loader: ViewBadgeToCandidate,
      },

      // register
      {
        path: "register",
        children: [
          { index: true, element: <MainRegister /> },
          {
            path: "candidate",
            element: <RegisterCandidate />,
            action: RegisterCandidateAction,
            loader: GetExtenralWebsiteLoader,
          },
          {
            path: "examiner",
            element: <RegisterCertifyingAuthority />,
            action: RegisterApproverAction,
          },
          {
            path: "academy",
            element: <RegisterBadgeProvider />,
            action: RegisterAcademyAction,
          },
          {
            path: "email-verification",
            element: <VerificationCode />,
            action: verifiyCodeAction,
          },

          // verifyEmail
        ],
      },
    ],
  },

  {
    path: "personal-certificate/:candidateId",
    element: <DashboardLayoutWithoutLogin />,
    loader: getCandidateWithoutLoggedInLoader,
    children: [
      { index: true, element: <PersonelCertificateProfileWithoutLogin /> },
      {
        path: "all-badges",
        element: <PersonelCertificateAllBadgesWithoutLogin />,
        loader: getBadgesWithoutLoggedInLoader,
      },
      {
        path: "view-certificate/:candidateBadgeId",
        element: <CertificateCandidate />,
        loader: ViewBadgeToCandidate,
      },
    ],
  },
  // dashboard
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <Error />,
    loader: DashboardLoader,
    children: [
      // candidate
      {
        path: "candidate",
        children: [
          {
            path: "",
            element: <CandidateProfile />,
            errorElement: <Error />,

            children: [
              {
                path: "edit-profile-photo",
                action: EditCandidateProfileImageAction,
              },
            ],
          },

          {
            path: "all-badges",
            element: <CandidateBadges />,
            loader: AllCandidateBadgesLoader,
            errorElement: <Error />,
          },
          {
            path: "view-badge/:candidateBadgeId",
            element: <CertificateCandidate />,
            loader: ViewBadgeToCandidate,
          },
          {
            path: "update-information",
            element: <CandidateUpdateInformation />,
            action: UpdateProfileCandidateAction,
          },
          {
            path: "change-password",
            element: <ChangePasswordCandidate />,
            action: ChangePasswordCandidateAction,
          },
        ],
      },
      // examienr
      {
        path: "examiner",
        children: [
          {
            path: "",
            element: <ExaminerProfile />,
            children: [
              {
                path: "edit-profile-photo",
                action: EditExaminerProfileImageAction,
              },
            ],
          },
          {
            path: "badge-holder",
            element: <ExaminerBadgeHolder />,
            loader: AllBadgesExaminerLoader,
          },
          {
            path: "view-certificate/:candidateBadgeId",
            element: <CertificateCandidate />,
            loader: ViewBadgeToCandidate,
          },
          {
            path: "view-profile/:candidateId",
            element: <ExaminerViewCandidateProfile />,
            loader: ExaminerViewCandidateProfileLoader,
          },
          {
            path: "published-badges",
            element: <ExaminerPublishedBadges />,
            loader: AllPublishedBadgesExaminerLoader,
          },

          {
            path: "pending-badges",
            element: <ExaminerPendingBadges />,
            loader: AllPendingBadgesExaminerLoader,
          },
          {
            path: "pending-badges/:id",
            element: <ExaminerToViewThePendingBadge />,
            loader: ExaminerToViewThePendingBadgeLoader,
          },

          {
            path: "approve-badge/:candidateBadgeId",
            action: ExaminerToApproveCandidateBadgeAction,
          },
          {
            path: "decline-badge/:candidateBadgeId",
            action: ExaminerToDeclineCandidateBadgeAction,
          },

          // { path: "institute-list", element: <ExaminerInstituteList /> },
          {
            path: "update-information",
            element: <ExaminerUpdateInformation />,
            action: UpdateProfileExaminerAction,
          },
          {
            path: "change-password",
            element: <ChangePasswordExaminer />,
            action: ChangePasswordExaminerAction,
          },
        ],
      },

      // provider
      {
        path: "academy",
        errorElement: <Error />,
        children: [
          {
            path: "",
            element: <ProviderProfile />,
            children: [
              {
                path: "edit-profile-photo",
                action: EditProviderProfileImageAction,
              },
            ],
          },
          {
            path: "all-badges",
            element: <ProviderBadgeList />,
            loader: AllBadgesLoader,

            children: [
              {
                path: "edit-badge-image/:badgeId",
                action: UpdateBadgeImage,
              },
            ],
          },
          {
            path: "add-badge",
            element: <ProviderAddNewBadge />,
            action: AddBadgeAction,
          },
          {
            path: "edit-badge/:badgeId",
            element: <EditBadge />,
            loader: EditBadgeLoader,
            action: EditBadgeAction,
          },
          { path: "delete-badge/:badgeId", action: deleteBadgeAction },

          {
            path: "update-information",
            element: <ProviderUpdateInformation />,
            action: ProviderUpdateInformationAction,
          },
          {
            path: "holder-badges",
            element: <ProviderBadgeHolder />,
            errorElement: <Error />,
            loader: BadgeHolderLoader,
          },

          {
            path: "view-profile/:candidateId",
            errorElement: <Error />,
            element: <ProviderViewCandidateProfile />,
            loader: ProviderViewCandidateProfileLoader,
          },

          {
            path: "view-badges/:candidateId",
            errorElement: <Error />,
            element: <CandidateBadgesForProvider />,
            loader: GetCandidateBadgesloader,
          },
          {
            path: "view-certificate/:candidateBadgeId",
            element: <CertificateCandidate />,
            loader: ViewBadgeToCandidate,

            errorElement: <Error />,
          },

          {
            path: "declined-badges",
            element: <ProviderDeclinedBadge />,
            errorElement: <Error />,
            loader: DeclinedBadgeLoader,
            children: [
              {
                path: "delete-declined-badge/:candidateBadgeId",
                errorElement: <Error />,
                action: DeleteDeclinedBadgeCandidateByProviderAction,
              },
            ],
          },

          {
            path: "pending-badges",
            element: <ProviderPendingRequests />,
            errorElement: <Error />,
            loader: PendingBadgeLoader,
          },

          // awarding badge
          {
            path: "award-badge",
            element: <ProviderAwardingBadgeSearch />,
            action: getCandidateToAwardBadgeAction,
          },

          {
            path: "award-badge/:candidateId",
            element: <ProviderAwardingBadgeAdd />,
            loader: getCandidateProfileToAwardLoader,
            children: [
              {
                index: true,
                element: <ProviderAwardingBadgeProfile />,
                loader: GetProfileToAwardLoader,
              },
              { path: "all-badges", element: <ProviderAwardingBadgeList /> },

              {
                path: "awarding-new-badge",
                element: <ProviderAwardingBadgeToAwardBadge />,
                loader: getBadgesOfAcademyToAward,
                action: addBadgeToCandidate,
              },
            ],
          },
          {
            path: "award-badge/view-certificate/:candidateBadgeId",
            // element: <ProviderViewCandidateBadge />,
            // loader: getCertificateToReview,

            element: <CertificateCandidate />,
            loader: ViewBadgeToCandidate,
            errorElement: <Error />,
          },
          {
            path: "edit-awarde-badge/:candidateBadgeId/:id",
            element: <ProviderAwardingBadgeToEditBadge />,
            loader: EditAwardingBadgeLoader,
            action: EditAwardingBadgeAction,
          },
          {
            path: "change-password",
            element: <ChangePasswordAcademy />,
            action: ChangePasswordAcademyAction,
          },
        ],
      },

      // admin
      {
        path: "admin",
        errorElement: <Error />,
        children: [
          {
            path: '',
            element: <AdminProfile />,
            children: [
              {
                path: "edit-profile-photo",
                action: EditAdminProfileImageAction,
              },
            ],
          },
          {
            path: "candidate-badges",
            element: <AdminCandidateBadges />,
            loader: GetCandidateBadges,
            errorElement: <Error />,
          },
          {
            path: "candidate-badges/view/:candidateBadgeId",
            element: <CertificateCandidate />,
            loader: ViewBadgeToCandidate,
          },

          {
            path: "candidates",

            children: [
              {
                path: "",
                element: <AdminCandidatesInfo />,
                loader: GetCandidateInfo,
              },

              {
                path: "candidate-suspend/:userId",
                action: AdminSuspendCandidateAction,
              },
              {
                path: "candidate-approve/:userId",
                action: AdminApproveCandidateAction,
              },
              {
                path: "candidate-delete/:userId",
                action: AdminDeleteCandidateAction,
              },
            ],
          },

          {
            path: "candidates/view/:userId",
            element: <AdminViewCandidateProfile />,
            loader: AdminViewExaminerProfileLoader,
          },
          {
            path: "candidate/edit/:userId",
            element: <AdminCandidateEdit />,
            loader: GetCandidatesToUpdateByAdminLoader,
            action: UpdateCandidatesToUpdateByAdminAction,
          },

          {
            path: "examiner",
            element: <AdminExaminersInfo />,
            loader: GetExaminersInfo,
          },
          {
            path: "examiner-suspend/:userId",
            action: AdminSuspendExaminerAction,
          },
          {
            path: "examiner-approve/:userId",
            action: AdminApproveExaminerAction,
          },
          {
            path: "examiner-delete/:userId",
            action: AdminExaminerDeleteAction,
          },
          {
            path: "examiner/view/:userId",
            element: <ExaminerProfileViewByAdmin />,
            loader: ExaminerProfileViewByAdminLoader,
          },
          {
            path: "examiner/edit/:userId",
            element: <AdminExaminerEdit />,
            loader: GetExaminerToUpdateByAdminLoader,
            action: UpdateExaminerToUpdateByAdminAction,
          },
          {
            path: "provider",
            element: <AdminProvidersInfo />,
            loader: GetProvidersInfo,
            children: [
              { index: true, element: <AdminProvidersInfo /> },
              { path: "suspend/:userId", action: AdminSuspendProviderAction },
              { path: "approve/:userId", action: AdminApprovalProviderAction },
              { path: "delete/:userId", action: AdminDeleteProviderAction },
            ],
          },
          {
            path: "provider/view/:userId",
            element: <AdminViewProviderProfile />,
            loader: AdminViewProviderProfileLoader,
          },
          {
            path: "provider/edit/:userId",
            element: <AdminProviderEdit />,
            loader: GetProviderToUpdateByAdminLoader,
            action: UpdateProviderToUpdateByAdminAction,
          },

          {
            path: "manage-external",
            element: <AllExternalCertificates />,
            loader: AllExternalCertificatesLoader,
            children: [
              { path: "edit/:websiteId", action: EditExternalBadgeImageAction },
            ],
          },
          {
            path: "manage-external/update-external-badge/:websitId",
            element: <EditExternalBadge />,
            loader: EditExternalBadgeLoader,
            action: EditExternalBadgeAction,
          },
          {
            path: "manage-external/delete-external-badge/:websitId",
            action: DeleteExternalBadgeAction,
          },

          {
            path: "manage-external/add-new-external-certificate",
            element: <AddExternalCertificate />,
            action: AddExternalCertificateAction,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
            action: ChangePasswordAdmin,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
