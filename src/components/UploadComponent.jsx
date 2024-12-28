import React, { useRef } from 'react';
import { FileText } from 'lucide-react';

const UploadComponent = () => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="border-2 border-dashed border-gray-200 rounded p-6 bg-white flex flex-col items-center justify-center h-80">
            {/* Custom Logo */}
            <div className="mb-4 relative">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                    <FileText className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -left-8 top-8 w-6 h-12 bg-gray-200 rounded-l-full" />
                <div className="absolute -right-8 top-8 w-6 h-12 bg-gray-200 rounded-r-full" />
            </div>

            <h3 className="text-base font-medium mb-1">Upload Your Invoice</h3>
            <p className="text-sm text-gray-500 mb-4">To auto-populate fields and save time</p>

            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
            />

            <button
                onClick={handleClick}
                className="mb-2 px-4 py-1.5 border border-gray-200 rounded text-sm hover:bg-gray-50"
            >
                Upload File
            </button>

            <p className="text-xs text-gray-400">Click to upload or Drag and drop</p>
        </div>
    );
};

export default UploadComponent;