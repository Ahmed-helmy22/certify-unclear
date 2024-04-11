 //  certifcate
export { default as CheckCertificatesProfile } from './Certificate/CheckCertificatesProfile'
export { default as ValideBagdCertificate } from './Certificate/ValideBagdeCertificate'
export { default as ProfileCertificate } from './Certificate/ProfileCertificate'
export { default as CertificateCandidate } from './Certificate/CertificateCandidate'
// Auth
export { default as Login } from './Auth/Login'
 
export { default as RegisterCertifyingAuthority } from './Auth/RegisterCertifyingAuthority'
export { default as RegisterCandidate } from './Auth/RegisterCandidate'
export { default as RegisterBadgeProvider } from './Auth/RegisterBadgeProvider'



export { default as VerificationCode } from './Auth/VerificationCode'
export { default as ResetPassword } from './Auth/ResetPassword'
 export { default as RegisterAcademy } from './Auth/RegisterAcademy'
export { default as MainRegister } from './Auth/MainRegister'
export { default as CandidateCompleteRegister } from './Auth/Candidate/CandidateCompleteRegister'
export { default as ForgetPassword } from './Auth/ForgetPassword'
// ProviderPersonalInformation ProviderSignup ProviderCompleteRegister
export { default as ProviderPersonalInformation } from './Auth/Provider/ProviderPersonalInformation'
export { default as ProviderSignup } from './Auth/Provider/ProviderSignup'
export { default as ProviderCompleteRegister } from './Auth/Provider/ProviderCompleteRegister'
// 
export { default as DashboardLayout } from './DashboardLayout'
export { default as HomeLayout } from './HomeLayout'
export { default as Error } from './Error'
// 
export { default as DashboardLayoutWithoutLogin } from './DashboardLayoutWithoutLogin'
// candidate
export { default as CandidateProfile } from './Candidate/CandidateProfile'
export { default as CandidateBadges } from './Candidate/CandidateBadges'
export { default as CandidateUpdateInformation } from './Candidate/CandidateUpdateInformation'
// Provider
export { default as ProviderProfile } from './Provider/ProviderProfile'
export { default as ProviderBadgeHolder } from './Provider/ProviderBadgeHolder'
export { default as ProviderPendingRequests } from './Provider/ProviderPendingRequests'
export { default as ProviderDeclinedBadge } from './Provider/ProviderDeclinedBadge'
export { default as ProviderAddNewBadge } from './Provider/ProviderAddNewBadge'
export { default as ProviderAwardingBadge } from './Provider/ProviderAwardingBadge'
export { default as ProviderBadgeList } from './Provider/ProviderBadgeList'
export { default as ProviderAwardingBadgeToAwardBadge } from './Provider/ProviderAwardingBadgeToAwardBadge'
export { default as ProviderAwardingBadgeProfile } from './Provider/ProviderAwardingBadgeProfile'
export { default as ProviderAwardingBadgeList } from './Provider/ProviderAwardingBadgeList'
export { default as ProviderAwardingBadgeSearch } from './Provider/ProviderAwardingBadgeSearch'
export { default as ProviderAwardingBadgeToEditBadge } from './Provider/ProviderAwardingBadgeToEditBadge'
export { default as ProviderAwardingBadgeAdd } from './Provider/ProviderAwardingBadgeAdd'
export { default as ProviderViewCandidateBadge } from './Provider/ProviderViewCandidateBadge'
export { default as ProviderUpdateInformation } from './Provider/ProviderUpdateInformation'
export { default as ProviderViewCandidateProfile } from './Provider/ProviderViewCandidateProfile'
// admin
export { default as AdminProfile } from './Admin/AdminProfile'
export { default as AdminCandidateBadges } from './Admin/AdminCandidateBadges'
export { default as AdminProvidersInfo } from './Admin/AdminProvidersInfo'
export { default as AdminExaminersInfo } from './Admin/AdminExaminersInfo'
export { default as AdminCandidatesInfo } from './Admin/AdminCandidatesInfo'
export { default as AdminCandidateEdit } from './Admin/AdminCandidateEdit'
export { default as AdminExaminerEdit } from './Admin/AdminExaminerEdit'
export { default as AdminProviderEdit } from './Admin/AdminProviderEdit'
export { default as AdminViewExaminerProfile } from './Admin/AdminViewCandidateProfile'
export { default as AdminViewCandidateProfile } from './Admin/AdminViewCandidateProfile'
export { default as AdminViewProviderProfile } from './Admin/AdminViewProviderProfile'
//  Home
export { default as Landing } from './Home/Landing'
export { default as About } from './Home/About'
export { default as Contact } from './Home/Contact'
// PersonelCertificate
export { default as PersonelCertificate } from './PersonelCertificate/PersonelCertificate'
export { default as PersonelCertificateAllBadges } from './PersonelCertificate/PersonelCertificateAllBadges'
 // badge
export { default as EditBadge } from './Badge/EditBadge'
// export { default as DeleteBadge } from './Badge/DeleteBadge'
// examiner
export { default as ExaminerProfile } from './Examiner/ExaminerProfile'
export { default as ExaminerBadgeHolder } from './Examiner/ExaminerBadgeHolder'
export { default as ExaminerPendingBadges } from './Examiner/ExaminerPendingBadges'
export { default as ExaminerPublishedBadges } from './Examiner/ExaminerPublishedBadges'
export { default as ExaminerInstituteList } from './Examiner/ExaminerInstituteList'
export { default as ExaminerUpdateInformation } from './Examiner/ExaminerUpdateInformation'
export { default as ExaminerToViewThePendingBadge } from './Examiner/ExaminerToViewThePendingBadge'
export { default as ExaminerViewCandidateProfile } from './Examiner/ExaminerViewCandidateProfile'
export { default as ExaminerProfileViewByAdmin } from './Examiner/ExaminerProfileViewByAdmin'
// update information
export { default as UpdateInformation } from './UpdateInformation'
// withotulogin
export { default as PersonelCertificateProfileWithoutLogin } from './CandidateBadgeWithoutLogin/PersonelCertificateProfileWithoutLogin'
export { default as PersonelCertificateAllBadgesWithoutLogin } from './CandidateBadgeWithoutLogin/PersonelCertificateAllBadgesWithoutLogin'
//  external
export { default as AllExternalCertificates } from './ExternalCertificates/AllExternalCertificates'
export { default as AddExternalCertificate } from './ExternalCertificates/AddExternalCertificate'
export { default as ExternalCertificateMainPage } from './ExternalCertificates/ExternalCertificateMainPage'
 export { default as EditExternalBadge } from '../components/externalBadges/EditExternalBadge'
// 
export { default as ChangePassword } from './ChangePassword/ChangePassword'
export { default as ChangePasswordCandidate } from './ChangePassword/ChangePasswordCandidate'
export { default as ChangePasswordAcademy } from './ChangePassword/ChangePasswordAcademy'
export { default as ChangePasswordExaminer } from './ChangePassword/ChangePasswordExaminer'
export { default as CandidateBadgesForProvider } from './Provider/CandidateBadgesForProvider'