import React from 'react'

function Model({ children, isOpen, onClose, title }) {
    if (!isOpen) return;
    return (
        <div className="fixed inset-0 bg-black/30 overflow-y-auto h-full w-full z-50 bg-opacity-50" onClick={onClose}>
            <div className="relative top-20 mx-auto p-5  w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>

                {/* Modal Header */}
                <div className="flex items-center justify-between mb-4">

                    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>

                    <button type="button" className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>

                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Content */}
                <div className="mb-4">{children}</div>
            </div>
        </div>
    )
}

export default Model
