import React from "react";

const Modal = ({ title, children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-3/4 lg:w-1/2">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
                <button
                    className="mt-4 bg-accent text-white px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
