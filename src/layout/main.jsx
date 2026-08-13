import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Main() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className={`min-h-screen flex flex-col md:flex-row bg-[#090d16] text-slate-100`}>
            <Sidebar
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* RIGHT WRAPPER: HEADER + MAIN CONTENT + FOOTER */}
            <div className="flex-1 md:pl-64 flex flex-col min-h-screen">

                {/* 2. TOP STICKY HEADER COMPONENT */}
                <Header />

                {/* 3. MAIN CONTENT AREA */}
                <main className="flex-1 px-3 sm:px-4 md:px-6 py-6 max-w-[1600px] w-full mx-auto animate-fade-in">
                    <Outlet />
                </main>

                {/* 4. GLOBAL FOOTER COMPONENT */}
                <Footer />

            </div>

        </div>
    )
}