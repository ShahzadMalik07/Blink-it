import React from 'react'

const DialogBox = ({ close,confirm}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                
                <h3 className="text-lg font-semibold text-center mb-4">
                    Are you sure you want to delete this item?
                </h3>
                <div className="flex justify-around">
                    <button onClick={confirm}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Yes
                    </button>
                    <button
                    onClick={()=>close()}

                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DialogBox
