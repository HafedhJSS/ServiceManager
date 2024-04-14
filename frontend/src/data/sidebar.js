import { FaTh, FaRegChartBar, FaCommentAlt, FaUsers } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { FaCodePullRequest } from "react-icons/fa6";
export const superAdmin_menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Create Requests",
    icon: <BiImageAdd />,
    path: "/createRequest",
  },
  {
    title: "Users",
    icon: <FaUsers />,
    path: "/users",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Contact us",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export const admin_menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Create Requests",
    icon: <BiImageAdd />,
    path: "/createRequest",
  },
  {
    title: "Edit Requests",
    icon: <FaCodePullRequest />,
    path: "/requestEditor",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Contact Us",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];
