import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
    getAllTests,
    addTest,
    updateTest,
    deleteTest,
    countTest,
} from "../Services/TestService";
import TestModal from "../Components/TestModal";
import { useNavigate } from "react-router-dom";



const AdminTestManagement = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [testCount, setTestCount] = useState(0);

    const navigate = useNavigate();

    // Load test và đếm
    const fetchTests = async () => {
        setLoading(true);
        try {
            const data = await getAllTests();
            setTests(data);
            const count = await countTest();
            setTestCount(count);
        } catch (err) {
            console.error("Lỗi khi load test:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTests();
    }, []);

    const handleAdd = () => {
        setSelectedTest(null);
        setIsModalOpen(true);
    };

    const handleEdit = (test) => {
        setSelectedTest(test);
        setIsModalOpen(true);
    };

    const handleDelete = async (testId) => {
        if (window.confirm("Bạn có chắc muốn xóa test này?")) {
            try {
                await deleteTest(testId);
                fetchTests();
            } catch (err) {
                console.error("Xóa test lỗi:", err);
            }
        }
    };

    const handleSave = async (testData, testId) => {
        try {
            if (testId) {
                await updateTest(testId, testData);
            } else {
                await addTest(testData);
            }
            setIsModalOpen(false);
            fetchTests();
        } catch (err) {
            alert("Lưu thất bại: " + (err.response?.data || err.message));
        }
    };

    const filteredTests = tests.filter(
        (t) =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            (t.description && t.description.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Quản lý Test
                </h1>
                <button
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
                    onClick={handleAdd}
                >
                    <Plus size={18} /> Thêm Test
                </button>
            </div>

            <input
                type="text"
                placeholder="Tìm kiếm theo tiêu đề hoặc mô tả..."
                className="border p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
                <div className="text-center py-10 text-gray-500">Đang tải dữ liệu...</div>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">#</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tiêu đề</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Mô tả</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Loại</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Trạng thái</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredTests.map((t, index) => (
                                <tr key={t.testId} className="hover:bg-gray-50 transition duration-150" onClick={() => navigate(`/admin/tests/${t.testId}/stat`)}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{t.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{t.description || "—"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{t.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {t.isActive ? "Hoạt động" : "Không hoạt động"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex justify-center gap-3">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(t);
                                            }}
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(t.testId);
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredTests.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-gray-400">
                                        Không tìm thấy test
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <TestModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    test={selectedTest}
                />
            )}
        </div>
    );
};

export default AdminTestManagement;
