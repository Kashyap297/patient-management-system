import React from "react";
import medicalBg from "../assets/images/medical_bg.png";
import { Users, Calendar, BarChart3 } from "lucide-react";
import logo from "../assets/images/logo.png";

const SidePanel = () => {
  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center overflow-hidden">
      
      {/* Premium Medical Background */}
      <img src={medicalBg} alt="Medical Background" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      
      {/* Gradient Overlays for better readability & depth */}
      <div className="absolute inset-0 bg-blue-900/50 mix-blend-multiply z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E1525]/95 via-[#0E1525]/70 to-transparent z-10"></div>
      
      {/* Top Logo */}
      <div className="absolute top-10 left-12 z-20">
         <img src={logo} alt="Logo" className="h-12 brightness-0 invert opacity-90 drop-shadow-md" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-2xl px-12 mt-10">
        
        <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg mb-5 leading-[1.1]">
          Advanced Healthcare <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            CRM Platform
          </span>
        </h1>
        
        <p className="text-gray-300 font-medium text-lg leading-relaxed drop-shadow-sm mb-16 max-w-md">
          Empower your medical staff and administrators with comprehensive tools to manage patients, appointments, and hospital analytics seamlessly.
        </p>

        {/* Abstract Floating Dashboard UI */}
        <div className="relative w-full h-72">
          
          {/* Main Mock Window */}
          <div className="absolute top-0 left-0 right-16 bottom-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
            {/* Mock Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
              <div className="flex space-x-3">
                <div className="h-3 w-16 bg-white/10 rounded-full"></div>
                <div className="h-3 w-8 bg-cyan-400/40 rounded-full"></div>
              </div>
            </div>
            
            {/* Mock Content */}
            <div className="flex space-x-6 h-full">
              {/* Sidebar */}
              <div className="w-1/4 space-y-4">
                <div className="h-3 w-full bg-white/20 rounded-full"></div>
                <div className="h-3 w-3/4 bg-white/10 rounded-full"></div>
                <div className="h-3 w-5/6 bg-white/10 rounded-full"></div>
                <div className="h-3 w-2/3 bg-white/10 rounded-full mt-8"></div>
              </div>
              {/* Main Area */}
              <div className="w-3/4 space-y-4">
                <div className="h-20 w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/10 rounded-xl border border-white/5"></div>
                <div className="flex space-x-4">
                  <div className="h-24 w-1/2 bg-white/5 rounded-xl border border-white/5"></div>
                  <div className="h-24 w-1/2 bg-white/5 rounded-xl border border-white/5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Widget 1: Total Patients */}
          <div className="absolute -top-8 right-0 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] border border-white/50 w-52 animate-[bounce_5s_infinite] transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600"><Users size={20} strokeWidth={2.5}/></div>
              <span className="font-bold text-gray-700 text-sm">Total Patients</span>
            </div>
            <div className="text-3xl font-extrabold text-gray-900 ml-1">2,405</div>
            <div className="text-xs text-green-600 font-bold ml-1 mt-1.5 flex items-center">
               <span className="mr-1">↑</span> +14% this month
            </div>
          </div>

          {/* Floating Widget 2: Upcoming Appointments */}
          <div className="absolute bottom-4 -left-10 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] border border-white/50 w-60 animate-[bounce_6s_infinite_reverse] transform hover:scale-105 transition-transform duration-300" style={{animationDelay: '1s'}}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 bg-cyan-100 rounded-xl text-cyan-600"><Calendar size={20} strokeWidth={2.5}/></div>
              <span className="font-bold text-gray-700 text-sm">Appointments</span>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm"></div>
                  <div>
                    <div className="h-2 w-16 bg-gray-400 rounded-full mb-1.5"></div>
                    <div className="h-1.5 w-10 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                <div className="h-2 w-10 bg-cyan-300 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm"></div>
                  <div>
                    <div className="h-2 w-12 bg-gray-400 rounded-full mb-1.5"></div>
                    <div className="h-1.5 w-14 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                <div className="h-2 w-10 bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Floating Widget 3: Activity/Analytics */}
          <div className="absolute -bottom-12 right-12 bg-[#1C1F2E]/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/10 w-48 animate-[bounce_7s_infinite] transform hover:scale-105 transition-transform duration-300" style={{animationDelay: '2s'}}>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2.5 bg-white/10 rounded-xl text-cyan-400"><BarChart3 size={20} strokeWidth={2.5}/></div>
              <span className="font-bold text-gray-200 text-sm">Revenue</span>
            </div>
            <div className="text-2xl font-extrabold text-white ml-1">$45,280</div>
            <div className="w-full h-10 mt-3 flex items-end space-x-1.5">
              <div className="w-1/5 bg-cyan-500/40 h-1/2 rounded-t-sm"></div>
              <div className="w-1/5 bg-cyan-500/60 h-3/4 rounded-t-sm"></div>
              <div className="w-1/5 bg-cyan-400 h-full rounded-t-sm shadow-[0_0_12px_rgba(34,211,238,0.6)]"></div>
              <div className="w-1/5 bg-cyan-500/80 h-4/5 rounded-t-sm"></div>
              <div className="w-1/5 bg-cyan-500/50 h-2/3 rounded-t-sm"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SidePanel;
