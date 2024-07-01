"use client";

import React, { useState, useEffect } from "react";

import TopNav from "./TopNav";
import SideBar from "./SideBar";
import { GetApiProvider } from "@/app/components/utilityComponents/dropDown/GetApiContext";
import { ActiveItemProvider } from "@/app/components/utilityComponents/dropDown/ActiveItemContext";
import { ChooseRecommendContextProvider } from "../loadingPages/recommend/ChooseRecommendContext";

interface LayoutProps {
    children: React.ReactNode;
    isSidebarOpen : boolean;
    onToggleSidebar: () => void;
  }

interface ChildProps {
    isSidebarOpen: boolean;
}

const Layout: React.FC<LayoutProps> = ({children, isSidebarOpen, onToggleSidebar}) => {
  const [userName, setUserName] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [memoryIdList, setMemoryIdList] = useState<
    Array<{ memory_id: string; last_chat_time: string; project_name: string }>
  >([]);
  const [selectMemoryId, setSelectMemoryId] = useState("");

  //logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("memory_id_list");
    window.location.href = "/login";
  };

  const handleSelectMemory = (memoryId: string) => {
    setSelectMemoryId(memoryId);
  };

  //쿠키에서 값을 가져오는 함수
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };


  //token 보유 유무 확인 후 리디렉션(차후 개선 필요)+토큰/memory-id-list 로컬스토리지에
  useEffect(() => {
    const token = getCookie('access_token');
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUserName(payload.username);

    switch (payload.role) {
      case "super_admin":
        setUserLevel("최고관리자");
        break;
      case "admin":
        setUserLevel("관리자");
        break;
      case "nomal":
        setUserLevel("일반 사용자");
        break;
      default:
        setUserLevel("알 수 없음");
    }

    
    const storedMemoryIdList = localStorage.getItem("memory_id_list");
    if (storedMemoryIdList) {
      setMemoryIdList(JSON.parse(storedMemoryIdList));
    }
  }, []);

  return (
    <div className="w-full flex-col items-center justify-center">
      <GetApiProvider>
        <ActiveItemProvider>
          <ChooseRecommendContextProvider>
            <TopNav
              userLevel={userLevel}
              userName={userName}
              onToggleSidebar={onToggleSidebar}
            />

            <div className="flex flex-grow">
                {isSidebarOpen && (
                  <SideBar
                    isSuperAdmin={userLevel === "최고관리자"}
                    userName={userName}
                    userLevel={userLevel}
                    handleLogout={handleLogout}
                    memoryIdList={memoryIdList}
                    onSelectMemory={handleSelectMemory}
                  />
                )}
                <div className= 
                    {`w-full h-full items-center mt-[83px]
                        ${isSidebarOpen 
                            ? 'pl-[336px]' 
                            : 'max-w-[768px] mx-auto'}`}>
                            {React.Children.map(children, (child) => {
                                if (React.isValidElement<ChildProps>(child)) {
                                    return React.cloneElement<ChildProps>(child, { isSidebarOpen });
                                }
                                return child;
                            })}
                </div>
            </div>
          </ChooseRecommendContextProvider>
        </ActiveItemProvider>
      </GetApiProvider>
    </div>
  );
};

export default Layout;

