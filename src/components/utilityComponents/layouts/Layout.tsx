"use client";

import React, { useState, useEffect } from "react";

import TopNav from "./TopNav";
import SideBar from "./SideBar";
import { GetApiProvider } from "@/components/utilityComponents/dropDown/GetApiContext";
import { ActiveItemProvider } from "@/components/utilityComponents/dropDown/ActiveItemContext";
import { ChooseRecommendContextProvider } from "../loadingPages/recommend/ChooseRecommendContext";

interface LayoutProps {
    children: React.ReactNode;
    isSidebarOpen : boolean;
    onToggleSidebar: () => void;
    onToggleLearning: () => void;
    setSelectedMemoryId: (memoryId: string) => void;
  }

interface ChildProps {
    isSidebarOpen: boolean;
}

const Layout: React.FC<LayoutProps> = ({children, isSidebarOpen, onToggleSidebar, onToggleLearning, setSelectedMemoryId}) => {
  const [userName, setUserName] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [memoryIdList, setMemoryIdList] = useState<
    Array<{ first_query: string; memory_id: string; last_chat_time: string; project_name: string }>
  >([]);

  //쿠키에서 값을 가져오는 함수
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
};

  //logout
  const handleLogout = () => {
    document.cookie =
      "access_token=; Max-Age=0; path=/; Secure; HttpOnly; SameSite=Strict";
    window.location.href = "/login";
  };

  const handleSelectMemory = (memoryId: string) => {
    setSelectedMemoryId(memoryId);
  };

  //sideBar에 전체 memoryId 불러오기
  const fetchMemoryIdList = async () => {
    const token = getCookie("access_token");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    try {
      // API 호출하여 전체 memoryIdList 불러오기
      const response = await fetch(
        `https://port-0-hanshin-chatbot-be-1272llwsz1ihz.sel5.cloudtype.app/project-memory-list`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      console.log("memory list", data);
      setMemoryIdList(data);
    
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
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
    
    fetchMemoryIdList();
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
              onToggleLearning={onToggleLearning}
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

