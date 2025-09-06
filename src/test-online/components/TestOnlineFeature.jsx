import React from 'react'
import testbg from '../../assets/testbg.jpg'

const TestOnlineFeature = () => {
    return (
        <div
            className="hidden md:block w-full h-[400px] bg-cover bg-center"
            style={{ backgroundImage: `url(${testbg})` }}
        >
        </div>
    )
}

export default TestOnlineFeature
