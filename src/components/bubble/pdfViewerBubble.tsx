import React from 'react';

const PdfViewerBubble: React.FC = () => {
    return (
        <div className="w-full mt-4 py-2 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="w-[293px] h-[350px] bg-neutral-100 rounded-[10px]">
                <embed src="public/assets/example.pdf" type="application/pdf" width="100%" height="100%" 
                       className="rounded-[10px]"/>
            </div>
        </div>
    );
};

export default PdfViewerBubble;