"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import TopNav from "@/components/layoutComponents/topNavs/TopNav";
import dynamic from "next/dynamic";
import SideBar from "@/components/layoutComponents/sideBars/SideBar";
import { GetApiProvider } from "@/components/dropDown/GetApiContext";
import { ActiveItemProvider } from "../../components/dropDown/ActiveItemContext";
import { ChooseRecommendContextProvider } from "@/components/layoutComponents/loadingPages/recommend/ChooseRecommendContext";

// Container 컴포넌트를 동적으로 가져오기
const Container = dynamic(
  () => import("@/components/layoutComponents/containers/Container"),
  {
    ssr: false, // 서버 사이드 렌더링 비활성화
    suspense: true,
  }
);

interface HomeProps {
  searchParams: { [key: string]: string | undefined };
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const pathname = usePathname();
  const router = useRouter();
  console.log("서치 파람스", searchParams);
  // const searchParams = useSearchParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [activePage, setActivePage] = useState("Container");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);
  const [memoryIdList, setMemoryIdList] = useState<
    Array<{ memory_id: string; last_chat_time: string; project_name: string }>
  >([]);

  //sideBar toggle
  const handleSideBarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  //logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("memory_id_list");
    window.location.href = "/login";
  };

  //token 보유 유무 확인 후 리디렉션(차후 개선 필요)+토큰/memory-id-list 로컬스토리지에
  useEffect(() => {
    const token = localStorage.getItem("access_token");
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

    // 로컬 스토리지에서 memoryIdList 가져오기
    const storedMemoryIdList = localStorage.getItem("memory_id_list");
    if (storedMemoryIdList) {
      setMemoryIdList(JSON.parse(storedMemoryIdList));
    }
  }, []);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    updateQuery(page, selectedProject);
  };
  const handleProjectSelect = (projectName: string | null) => {
    setSelectedProject(projectName);
    if (activePage === "ProjectManagement") {
      updateQuery("ProjectManagement", projectName);
    }
  };
  const handleSelectMemory = (memoryId: string) => {
    console.log("Home handleSelectMemory", memoryId);
    setSelectedMemoryId(memoryId);
  };

  //브라우저 히스토리 업데이트
  const updateQuery = (page: string, project: string | null = null) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    console.log("search", searchParams);
    console.log("params", params);
    const currentPage = searchParams?.page || null;
    const currentProject = searchParams?.project || null;

    if (currentPage === page && currentProject === project) return;

    params.set("page", page);
    if (project !== null) {
      params.set("project", project);
      params.set("view", "ProjectDetail");
    } else {
      params.set("view", "ProjectListPage");
      params.delete("project");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const page = searchParams.page;
    const project = searchParams.project;

    if (page && page !== activePage) {
      setActivePage(page);
    }

    if (project && project !== selectedProject) {
      setSelectedProject(project === "null" ? null : project);
    }
  }, [searchParams]);

  //뒤로가기 했을 떄 selectedProject 리셋
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const project = params.get("project");

      if (!project) {
        setSelectedProject(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="w-full flex-col items-center justify-center">
      <GetApiProvider>
        <ActiveItemProvider>
          <ChooseRecommendContextProvider>
            <TopNav
              userLevel={userLevel}
              userName={userName}
              onToggleSidebar={handleSideBarToggle}
            />
            <div className="flex flex-grow">
              <Suspense fallback={<div>Loading...</div>}>
                {isSidebarOpen && (
                  <SideBar
                    isSuperAdmin={userLevel === "최고관리자"}
                    userName={userName}
                    userLevel={userLevel}
                    handleLogout={handleLogout}
                    setActivePage={handlePageChange}
                    memoryIdList={memoryIdList}
                    onSelectMemory={handleSelectMemory}
                  />
                )}
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                <Container
                  searchParams={searchParams}
                  isSidebarOpen={isSidebarOpen}
                  activePage={activePage}
                  selectedProject={selectedProject}
                  onProjectSelect={handleProjectSelect}
                  setActivePage={handlePageChange}
                  selectedMemoryId={selectedMemoryId}
                />
              </Suspense>
            </div>
          </ChooseRecommendContextProvider>
        </ActiveItemProvider>
      </GetApiProvider>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect, Suspense } from 'react';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import TopNav from '@/components/layoutComponents/topNavs/TopNav';
// import Contents from '@/components/layoutComponents/containers/Contents';
// import SideBar from '@/components/layoutComponents/sideBars/SideBar';
// import { GetApiProvider } from '@/components/dropDown/GetApiContext';
// import { ActiveItemProvider } from '../../components/dropDown/ActiveItemContext';
// import { ChooseRecommendContextProvider } from '@/components/layoutComponents/loadingPages/recommend/ChooseRecommendContext';

// const Home: React.FC = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userLevel, setUserLevel] = useState('');
//   const [activePage, setActivePage] = useState('Container');
//   const [selectedProject, setSelectedProject] = useState<string | null>(null);

//   //sideBar toggle
//   const handleSideBarToggle = () => {
//       setIsSidebarOpen(prevState => !prevState);
//   };

//   //logout
//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     window.location.href = '/login';
//   };

//   //token 보유 유무 확인 후 리디렉션(차후 개선 필요)
//   useEffect(() => {
//     // 클라이언트 측에서만 실행되도록 함
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         window.location.href = '/login'; // 토큰이 없으면 로그인 페이지로 리디렉션
//         return;
//       }

//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setUserName(payload.username);

//       // 역할에 따른 사용자 레벨 설정
//       switch (payload.role) {
//         case 'super_admin':
//           setUserLevel('최고관리자');
//           break;
//         case 'admin':
//           setUserLevel('관리자');
//           break;
//         case 'nomal':
//           setUserLevel('일반 사용자');
//           break;
//         default:
//           setUserLevel('알 수 없음');
//       }
//     }
//   }, []);

//   //브라우저 히스토리 업데이트
//   const updateQuery = (page: string, project: string | null = null) => {
//     const params = new URLSearchParams(searchParams);
//     const currentPage = searchParams.get('page');
//     const currentProject = searchParams.get('project');

//     if (currentPage === page && currentProject === project) return;

//     params.set('page', page);
//     if (project !== null) {
//       params.set('project', project);
//       params.set('view', 'ProjectDetail');
//     } else {
//       params.set('view', 'ProjectListPage');
//       params.delete('project');
//     }

//     router.push(`${pathname}?${params.toString()}`);
//   };

//   const handlePageChange = (page: string) => {
//     setActivePage(page);
//     updateQuery(page, selectedProject);
//   };

//   const handleProjectSelect = (projectName: string | null) => {
//     setSelectedProject(projectName);
//     if (activePage === 'ProjectManagement') {
//       updateQuery('ProjectManagement', projectName);
//     }
//   };

//   useEffect(() => {
//     const page = searchParams.get('page');
//     const project = searchParams.get('project');

//     if (page && page !== activePage) {
//       setActivePage(page);
//     }

//     if (project && project !== selectedProject) {
//       setSelectedProject(project === 'null' ? null : project);
//     }
//   }, [searchParams]);

//   //뒤로가기 했을 떄 selectedProject 리셋
//   useEffect(() => {
//     const handlePopState = () => {
//       const params = new URLSearchParams(window.location.search);
//       const project = params.get('project');

//       if (!project) {
//         setSelectedProject(null);
//       }
//     };

//     window.addEventListener('popstate', handlePopState);

//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, []);

//   return (
//     <div className="w-full flex-col items-center justify-center">
//       <GetApiProvider>
//         <ActiveItemProvider>
//           <ChooseRecommendContextProvider>

//             <TopNav userLevel={userLevel} userName={userName} onToggleSidebar={handleSideBarToggle}/>

//             <div className='flex flex-grow'>
//               {isSidebarOpen && <SideBar isSuperAdmin={userLevel === '최고관리자'}
//                                          userName={userName}
//                                          userLevel={userLevel}
//                                          handleLogout={handleLogout}
//                                          setActivePage={handlePageChange}/>}
//                 <Suspense fallback={<div>Loading...</div>}>
//                 <Contents
//                   isSidebarOpen={isSidebarOpen}
//                   activePage={activePage}
//                   selectedProject={selectedProject}
//                   onProjectSelect={handleProjectSelect}
//                   setActivePage={handlePageChange} />
//                 </Suspense>
//             </div>

//           </ChooseRecommendContextProvider>
//         </ActiveItemProvider>
//       </GetApiProvider>
//     </div>
//   );

// }

// export default Home;
