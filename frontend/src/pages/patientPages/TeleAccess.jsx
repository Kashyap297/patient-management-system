import React, { useEffect } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const TeleAccess = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    updateBreadcrumb([
      { label: "Teleconsultation Access", path: "/patient/tele-access" },
    ]);
  }, [updateBreadcrumb]);
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="flex h-full p-6">
        <div class="grid grid-cols-8 gap-6 flex-1 h-screen">
          <div class="col-span-5 flex flex-col">
            <div className="bg-white p-6 rounded-lg shadow-lg mt-6 video ">
              <h2 class="text-xl font-semibold">Patient Meeting Conference</h2>
              <p class="text-gray-500">Meeting started at 3:30PM</p>
            </div>
          </div>
          <div class="col-span-3 ">
            <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
              <div className="flex items-center justify-between">
                <h2 class="text-xl font-semibold">Chat</h2>
                <div className="cancell-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" /><path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z" /><path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z" /></svg>
                </div>
              </div>
              <div class="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner ">
                <div class="flex their-chat">
                  <div class="p-2 rounded-lg bg-gray-200">
                    <p>hellooo</p><span class="text-xs text-gray-500">14/10/2024, 21:19:59</span>
                  </div>
                </div>
                <div class="flex justify-end our-chat">
                  <div class="p-2 rounded-lg bg-blue-100">
                    <p>how are you</p>
                    <span class="text-xs text-gray-500">14/10/2024, 22:45:56</span>
                  </div>
                </div>
                <div class="flex  w-full">
                  <div class="p-2 rounded-full bg-white">
                    <div class="upload-btn-wrapper">
                      <button class="btn">+</button>
                      <input type="file" name="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeleAccess;
