import SignUpForm from "../../auth/Pages/SignUpForm"
import SignUpPage from "../../auth/Pages/SignUpPage"
import CourseSection from "../Components/CourseSection"
import FeatureSection from "../Components/FeatureSection"
import HistorySection from "../Components/HistorySection"
import InstructorSection from "../Components/InstructorSection"
import IntroSection from "../Components/IntroSection"

const Home = () => {
  return (
    <div className='w-full '>
        <IntroSection />
        <CourseSection />
        <FeatureSection />
        <InstructorSection />
        <h2 id="form-section" className='text-center text-3xl mb-20'>Các trương trình khuyến mãi hấp dẫn</h2>
        <SignUpPage />
        <HistorySection />
    </div>
  )
}

export default Home