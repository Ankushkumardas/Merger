import React from 'react'

function AuthLayout({ children }) {
    return (
        <div className='  min-h-screen bg-neutral-200/50'>
            <div className='container mx-auto max-w-screen-2xl pt-30 '>
                <div className=' flex justify-center items-center'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
