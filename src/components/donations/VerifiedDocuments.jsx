import React, { useState } from 'react';
import { FileText, CheckCircle2, Eye, X } from 'lucide-react';
import Button from '@/components/common/Button';

const DocumentModal = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EEF2FF] text-[#234398] rounded-xl flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{document.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-0.5">
                <CheckCircle2 size={14} />
                Verified Document
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100 flex items-center justify-center min-h-[400px]">
          {/* Placeholder for document image/pdf */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-xl w-full text-center aspect-[1/1.4] flex flex-col items-center justify-center">
            <FileText size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Document Preview: {document.name}</p>
            <p className="text-gray-400 text-sm mt-2">Issued: {document.date}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">Verified by: </span>
            {document.verifier}
          </div>
          <Button variant="secondary" onClick={onClose}>Close Preview</Button>
        </div>
      </div>
    </div>
  );
};

const VerifiedDocuments = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CheckCircle2 className="text-[#16A34A]" size={20} />
          Verified Documents
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="border border-gray-200 rounded-xl overflow-hidden group hover:border-[#6D4AFF]/30 transition-colors">
              <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center border-b border-gray-200 relative overflow-hidden">
                <FileText size={32} className="text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button 
                    onClick={() => setSelectedDoc(doc)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"
                  >
                    <Eye size={16} /> View
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold text-gray-900 truncate">{doc.name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-1">
                  <CheckCircle2 size={12} /> Verified
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDoc && (
        <DocumentModal 
          document={selectedDoc} 
          onClose={() => setSelectedDoc(null)} 
        />
      )}
    </>
  );
};

export default VerifiedDocuments;
