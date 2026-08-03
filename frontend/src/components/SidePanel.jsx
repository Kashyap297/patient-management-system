import React from "react";
import logoBanner from "../assets/images/loginBanner.png";
import logo from "../assets/images/logo.png";
import vector1 from "../assets/images/Vector1.png";
import vector2 from "../assets/images/Vector2.png";
import vector3 from "../assets/images/Vector3.png";
import vector from "../assets/images/Vector.png";

const SidePanel = () => {
  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0EABEB] via-blue-500 to-[#1C1F2E]">
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/10 backdrop-blur-sm z-0"></div>
      
      {/* Abstract Vectors */}
      <img src={vector1} alt="Vector Top Left" className="absolute top-[-5%] left-[-5%] w-64 h-64 opacity-60 animate-pulse-slow z-10" />
      <img src={vector2} alt="Vector Bottom Right" className="absolute bottom-[-10%] right-[-5%] w-72 h-72 opacity-60 animate-pulse-slow z-10" style={{animationDelay: '1.5s'}} />
      <img src={vector} alt="Vector Top Right" className="absolute top-[10%] right-[10%] w-32 h-32 opacity-40 z-10 hover:scale-110 transition-transform duration-500" />
      <img src={vector3} alt="Vector Floating" className="absolute top-[30%] right-[20%] w-24 h-24 opacity-80 animate-[bounce_4s_infinite] z-10" />

      {/* Main Content inside a dark glass card */}
      <div className="glass-dark p-12 rounded-[3rem] text-center relative z-20 max-w-lg mx-auto shadow-2xl animate-fade-in border-t border-l border-white/20">
        
        <div className="bg-white/95 p-4 rounded-2xl inline-block mb-8 shadow-xl">
          <img src={logo} alt="Logo" className="w-48 h-auto object-contain" />
        </div>
        
        <div className="relative group cursor-pointer mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <img
            src={logoBanner}
            alt="Banner"
            className="relative w-full max-w-sm mx-auto rounded-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <h2 className="text-4xl font-extrabold mt-6 text-white tracking-tight">
          Modern Hospital
        </h2>
        <p className="text-gray-300 mt-4 font-medium text-lg leading-relaxed">
          Streamline your workflow and <br className="hidden md:block"/> connect with your facility instantly.
        </p>
      </div>
    </div>
  );
};

export default SidePanel;
