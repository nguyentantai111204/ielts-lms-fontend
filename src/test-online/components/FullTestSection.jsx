import { useNavigate } from "react-router-dom";

const FullTestSection = ({ tests }) => {
  const navigate = useNavigate();

  const handleClick = (testId) => {
    navigate(`/test-online/${testId}`);
  };

  return (
    <section className="w-full px-4 py-10 bg-white text-center pt-20">
      <h2 className="text-4xl font-bold mb-10 text-[#6B47DC]">Full test</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tests.map((test) => (
          <div
            key={test.testId}
            onClick={() => handleClick(test.testId)}
            className="bg-[#F3EEFF] py-4 px-6 rounded-md text-left font-bold text-lg text-[#3A2F60] shadow-sm hover:text-[#8E69F4] cursor-pointer transition"
          >
            {test.description}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FullTestSection;
