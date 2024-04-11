export const BADGE_STATUS = {
  All: "all",
  PENDING: "pending",
  PUBLISHED: "published",
  DECLINED: "declined",
};

export const USER_STATUS = {
  APPROVED: "approved",
  PENDING: "pending",
  SUSPENDED: "suspended",
};
// status = pending || published || declined
// sort = asc , desc
export const JOB_SORT_BY = {
  ALL: "",
  ASC: "asc",
  DESC: "desc",
};

export const SORT_BY = {
  ASC: "Ascending",
  DESC: "Descending",
};
// enum : ["GOVERNMENT" , "NONPROFIT ORG" , "PRIVATE ACADEMY"]},
export const ACADEMY_PROVIDER_TYPE = {
  GOVERNMET: "GOVERNMENT",
  NONE_PROFIT: "NONPROFIT ORG",
  PRIVATE_ACADEMY: "PRIVATE ACADEMY",
};

export const USER_TYPE = {
  "": "",
  ACADEMY: "academy",
  CANDIDATE: "candidate",
  EXAMINER: "examiner",
};

export const CERTIFY_AUTHORITY_TYPE = {
  ASNT: "Society - ASNT NDT Level III",
  IADC: "Society - ACCP Professional Level III",
  PCN: "Institute - PCN NDT Level III",
  ACCP: "Institute - ACCP Professional Level III",
  AUTHOURITY_PRINCIPAL_REP:
    "Institute - The Authority Of Principal Representative",
  MANAGER: "Institute - Manager, Individual Certification Programs",
  PRESIDENT: "Association - President | Chief Examiner",
  CHIEF: "Association- Chief Executive Officer",
  DEAN: "College- Dean",
  OTHER: "Other",
};
