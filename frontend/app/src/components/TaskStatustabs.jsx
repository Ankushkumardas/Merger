import React from 'react'

function TaskStatustabs({ activeTab, setActiveTab, tabs }) {
    return (
        <div className="className"> {/* You might want to give this a meaningful class name */}
            <div className="className"> {/* You might want to give this a meaningful class name */}

                {/* {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className={`relative px-3 py-2 md:px-4 md:py-2 text-sm font-medium ${setActivetab === tab.label
                                ? 'bg-blue-400 text-white border-b-2 border-primary'
                                : 'text-gray-500 hover:text-gray-700'
                            } cursor-pointer`}
                        onClick={() => setActivetab(tab.label)}
                    >
                        <div>
                            <span>
                                {tab.label}
                            </span>
                            <span className={`${acriveTab===tab.label ?"bg-blue-400 text-white":"bg-gray-300 text-white"}`}></span>
                        
                        {tab.count !== undefined && (
                            <span className="ml-2 text-xs rounded-full bg-gray-200 text-gray-700 px-2 py-0.5">
                                {tab.count}
                            </span>
                        )}
                        </div>
                    </button>
                ))} */}

                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === tab.label
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TaskStatustabs
