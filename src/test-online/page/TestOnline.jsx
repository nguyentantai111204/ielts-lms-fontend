import React, { useEffect, useState } from "react";

import FullTestSection from "../components/FullTestSection";
import MiniTestSection from "../components/MiniTestSection";
import TestOnlineFeature from "../components/TestOnlineFeature";
import ReasonSection from "../components/ReasonSection";
import SignUpPage from "../../auth/Pages/SignUpPage";
import { loadTestList } from "../services/TestOnlineService";

const TestOnline = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await loadTestList(); 
        setTests(data);
      } catch (error) {
        console.error("Lỗi khi fetch test list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  const fullTests = tests.filter((t) => t.type === "FULL");
  const miniTests = tests.filter((t) => t.type === "MINI");

  return (
    <div className="w-full flex flex-col items-center pt-[60px]">
      <TestOnlineFeature />
      <FullTestSection tests={fullTests} />
      <MiniTestSection tests={miniTests} />
      <ReasonSection />
      <div className="max-w-[1280px] mt-10 mb-20">
        <SignUpPage />
      </div>
    </div>
  );
};

export default TestOnline;
