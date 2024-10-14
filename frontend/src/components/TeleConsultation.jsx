import React from "react";

const TeleConsultation = () => {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-100">
            <div className="flex h-full p-6">
                <div class="grid grid-cols-8 gap-6 flex-1">
                    <div class="col-span-5 flex flex-col">

                    </div>
                    <div class="col-span-3 flex flex-col">
                        <h2 class="text-xl font-semibold">Chat</h2>
                        <div className="cancell-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" /><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z" /><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeleConsultation;
