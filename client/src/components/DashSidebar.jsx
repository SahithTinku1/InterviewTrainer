import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice.js";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiDesktopComputer,
  HiViewBoards,
} from "react-icons/hi";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
const DashSidebar = () => {
  const location = useLocation();
  const dispatch=useDispatch()
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    // console.log(tabFromURL);
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);
  const handleSignout=async()=>{
    try {
      const res=await fetch('/api/user/signout',{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
      })
      const data=await res.json()
      if(!res.ok){
        // toast.error(data.message)
        console.log(data.message)
      }else{
        dispatch(signoutSuccess())
      }
    } catch (error) {
      // toast.error(error.message)
      console.log(error.message)
    }
  }
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark "
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} >Sign Out</Sidebar.Item>
          <Sidebar.Item icon={HiDesktopComputer} as="div">Join an Interview</Sidebar.Item>
          <Sidebar.Item icon={HiChartPie} as="div">Access an Interview</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
