import { MdOutlineUpdateDisabled ,MdNotificationAdd ,MdAdminPanelSettings , MdPendingActions} from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { BsCardList } from "react-icons/bs";
import { TbPlaceholder  , TbPlayerEject} from "react-icons/tb";



const links = [
  // academy
  {
    text: "Profile",
    path: "academy",
    mainPath: "academy",
    role: "provider",
    icon: <CgProfile />,
    className: "nav-link",
  },
  {
    text: "add badge",
    path: "academy/add-badge",
    mainPath: "academy",
    role: "provider",
    icon: <MdNotificationAdd />,
    className: "nav-link",
  },
  {
    text: "badge list",
    path: "academy/all-badges",
    mainPath: "academy",
    role: "provider",
    icon: <BsCardList />,
    className: "nav-link",
  },
 
  {
    text: "award badge",
    path: "academy/award-badge",
    mainPath: "academy",
    role: "provider",
    icon: <FaAward/>,
    className: "nav-link award-badg-class",
  },
  {
    text: "Badge Holders",
    path: "academy/holder-badges",
    mainPath: "academy",
    role: "provider",
    icon: <TbPlaceholder />,
    className: "nav-link",
  },
  {
    text: "pending badges",
    path: "academy/pending-badges",
    mainPath: "academy",
    role: "provider",
    icon: <MdPendingActions />,
    className: "nav-link",
  },
  {
    text: "declined badges",
    path: "academy/declined-badges",
    mainPath: "academy",
    role: "provider",
    icon: <TbPlayerEject />,
    className: "nav-link",
  },
  {
    text: "academy update info",
    path: "academy/update-information",
    mainPath: "academy",
    role: "provider",
    icon: <MdOutlineUpdateDisabled />,
    className: "nav-link",
  },
  {
    text: "change password",
    path: "academy/change-password",
    mainPath: "academy",
    role: "provider",
    icon: <MdOutlineUpdateDisabled />,
    className: "nav-link",
  },

  // candidate
  {
    text: "candidate-profile",
    path: "candidate",
    mainPath: "candidate",
    role: "candidate",
    className: "nav-link",
    icon: <CgProfile />,
  },
  {
    text: "Cand badge list",
    path: "candidate/all-badges",
    mainPath: "candidate",
    role: "candidate",
    className: "nav-link",
    icon: <BsCardList />,
  },
  {
    text: "candidate update info.",
    path: "candidate/update-information",
    mainPath: "candidate",
    role: "candidate",
    className: "nav-link",
    icon: <MdOutlineUpdateDisabled />,
  },
  {
    text: "change password",
    path: "candidate/change-password",
    mainPath: "candidate",
    role: "candidate",
    icon: <MdOutlineUpdateDisabled />,
    className: "nav-link",
  },

  // examiner
  {
    text: "Profile",
    path: "examiner",
    mainPath: "examiner",
    role: "examiner",
    className: "nav-link",
    icon: <CgProfile />,
  },
  {
    text: "Badge Holders",
    path: "examiner/badge-holder",
    mainPath: "examiner",
    role: "examiner",
    className: "nav-link",
    icon: <TbPlaceholder />,
  },
  {
    text: "published badges",
    path: "examiner/published-badges",
    mainPath: "examiner",
    role: "examiner",
    className: "nav-link",
    icon: <MdAdminPanelSettings />,
  },
  {
    text: "pending badges",
    path: "examiner/pending-badges",
    mainPath: "examiner",
    role: "examiner",
    className: "nav-link",
    icon: <MdPendingActions />,
  },
  {
    text: "update info",
    path: "examiner/update-information",
    mainPath: "examiner",
    role: "examiner",
    className: "nav-link",
    icon: <MdOutlineUpdateDisabled />,
  },
  {
    text: "change password",
    path: "examiner/change-password",
    mainPath: "examiner",
    role: "examiner",
    icon: <MdOutlineUpdateDisabled />,
    className: "nav-link",
  },
  //

  {
    text: "home",
    path: "/",
    mainPath: "not a user",
    role: "",
    icon: <CgProfile />,
    className: "nav-link",
  },
  {
    text: "personal-profile",
    path: "",
    mainPath: "not a user",
    role: "",
    icon: <CgProfile />,
    className: "nav-link",
  },
  {
    text: "all badges",
    path: "all-badges",
    mainPath: "not a user",
    role: "",
    icon: <ImProfile />,
    className: "nav-link",
  },
// admin
  {
    text: "admin-dashboard",
    path: "admin",
    mainPath: "admin",
    role: "admin",
    icon: <ImProfile />,
    className: "nav-link",
  },
  {
    text: "Badge Holders",
    path: "admin/candidate-badges",
    mainPath: "admin",
    role: "admin",
    icon: <ImProfile />,
    className: "nav-link",
  }
  ,
  {
    text: "Badge Issuer",
    path: "admin/provider",
    mainPath: "admin",
    role: "admin",
    icon: <ImProfile />,
    className: "nav-link",
  }
  ,
  {
    text: "Approving Authority",
    path: "admin/examiner",
    mainPath: "admin",
    role: "admin",
    icon: <ImProfile />,
    className: "nav-link",
  }
  ,
  {
    text: "Candidates Info",
    path: "admin/candidates",
    mainPath: "admin",
    role: "admin",
    icon: <ImProfile />,
    className: "nav-link",
  }
  ,
  {
    text: "extenral badge",
    path: "admin/manage-external",
    mainPath: "admin",
    role: "admin",
    icon: <ImProfile />,
    className: "nav-link",
  },
  {
    text: "change password",
    path: "admin/change-password",
    mainPath: "admin",
    role: "admin",
    icon: <MdOutlineUpdateDisabled />,
    className: "nav-link",
  },
  
];

export default links;
