import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { useOnboarding } from '../context/OnboardingContext';
import {
    LayoutDashboard,
    User,
    BookOpen,
    Briefcase,
    Settings,
    HelpCircle,
    MessageSquare,
    Bell,
    Plus,
    Search,
    MoreHorizontal,
    PlayCircle,
    Award,
    CheckCircle2
} from 'lucide-react';

// --- Sub-components for cleaner file structure ---

const SidebarItem = ({ icon: Icon, label, active, hasSubmenu }) => (
    <div className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-slate-100'}`}>
        <div className="flex items-center space-x-3">
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </div>
        {hasSubmenu && <span className="text-xs">▼</span>}
    </div>
);

const CourseCard = ({ title, instructor, progress, imageColor, logo }) => (
    <div className="min-w-[280px] bg-white rounded-xl border p-3 space-y-3 flex flex-col shadow-sm">
        <div className={`h-32 ${imageColor} rounded-lg relative overflow-hidden group`}>
            {/* Placeholder for course thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center text-white/50">
                <PlayCircle size={48} className="opacity-80" />
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">20:15</div>
        </div>
        <div>
            <h4 className="font-bold text-gray-800 line-clamp-2 leading-tight">{title}</h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{instructor}</p>
        </div>
        <div className="space-y-1 mt-auto">
            <div className="flex justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
        <div className="pt-2 border-t flex items-center justify-between">
            <span className="text-xs text-gray-400 flex items-center gap-1">
                Powered by <span className="font-bold text-gray-600">YouTube</span>
            </span>
        </div>
    </div>
);

const PlatformCard = ({ name, description, icon: Icon, color }) => (
    <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col space-y-3">
        <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} text-white`}>
                <Icon size={20} />
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs">Connect</Button>
        </div>
        <div>
            <h4 className="font-bold text-gray-900">{name}</h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
        </div>
    </div>
);

const StatCard = ({ count, label, icon: Icon, color }) => (
    <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-opacity-10 ${color.bg} ${color.text}`}>
            <Icon size={24} />
        </div>
        <div>
            <h3 className={`text-2xl font-bold ${color.text}`}>{count}</h3>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
        </div>
    </div>
);

// --- Main Dashboard Component ---

const Dashboard = () => {
    const { user } = useOnboarding();

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col fixed h-full z-10">
                <div className="p-6">
                    <div className="flex items-center space-x-2 text-primary">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg transform rotate-45 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-sm transform -rotate-45"></div>
                        </div>
                        <div>
                            <h1 className="font-bold text-xl tracking-tight text-gray-900">Record</h1>
                            <p className="text-[10px] text-gray-400 font-mono">v1.25.0</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                    <SidebarItem icon={User} label="Profile" />
                    <SidebarItem icon={Award} label="Skill Repository" />
                    <SidebarItem icon={BookOpen} label="Learnings" />
                    <SidebarItem icon={Briefcase} label="Jobs" />

                    <div className="pt-4 pb-2">
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tools</p>
                        <SidebarItem icon={PlayCircle} label="Youtube to Course" />
                        <SidebarItem icon={Briefcase} label="One Click Resume" />
                        <SidebarItem icon={LayoutDashboard} label="AI Assessment" />
                    </div>
                </nav>

                <div className="p-4 border-t space-y-1">
                    <SidebarItem icon={HelpCircle} label="Support" />
                    <SidebarItem icon={MessageSquare} label="Feedback" />
                    <div className="px-4 py-2 mt-4 text-xs text-gray-400">
                        <p>Privacy Policy | Terms & Conditions</p>
                        <p className="mt-1">© 2025 Record Innovation and Enterprises Pvt. Ltd.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 bg-slate-50 min-h-screen">
                {/* Header */}
                <header className="bg-white border-b px-8 py-3 flex justify-between items-center sticky top-0 z-20">
                    <div className="flex items-center text-gray-400">
                        <LayoutDashboard size={18} className="mr-2" />
                        <span className="text-sm font-medium">Dashboard</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button className="bg-black text-white hover:bg-gray-800 rounded-lg px-4 h-9 text-xs font-bold flex items-center gap-2">
                            <span className="text-yellow-400 text-lg">⚡</span> Upgrade
                        </Button>
                        <Button size="icon" variant="ghost" className="bg-orange-500 text-white hover:bg-orange-600 rounded-md h-8 w-8">
                            <Plus size={18} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-gray-500 hover:bg-slate-100 rounded-full">
                            <Bell size={20} />
                        </Button>
                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                            {/* Placeholder Avatar */}
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-xs font-bold">
                                    {user?.name?.[0] || 'U'}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">

                    {/* Top Row Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Hero Banner */}
                        <div className="lg:col-span-2 bg-black rounded-3xl p-8 relative overflow-hidden text-white flex flex-col justify-center min-h-[300px]">
                            <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 bg-gradient-to-l from-gray-800 to-transparent"></div>
                            {/* Decorative mock image content would go here, using CSS for now */}
                            <div className="relative z-10 max-w-md">
                                <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-medium">
                                    <span>Powered by</span>
                                    <span className="font-bold text-white flex items-center gap-1">
                                        <PlayCircle size={16} fill="white" className="text-black" /> YouTube
                                    </span>
                                </div>
                                <h2 className="text-4xl font-bold mb-6 leading-tight">Claim Skill badges from YouTube Contents</h2>
                                <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 font-bold">
                                    Try the tool →
                                </Button>
                            </div>

                            {/* Mock image on the right */}
                            <div className="absolute right-[-20px] top-10 w-[45%] h-[90%] bg-orange-500 rounded-xl transform rotate-[-5deg] border-4 border-white shadow-2xl overflow-hidden hidden xl:block">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)' }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                        <p className="font-bold text-lg">Web Development Masterclass</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Badges & Calendar) */}
                        <div className="space-y-6">
                            {/* Badges */}
                            <div className="bg-white p-5 rounded-2xl border shadow-sm">
                                <h3 className="font-bold text-gray-700 mb-4">Skill Badges</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-red-50 rounded-xl text-center">
                                        <p className="text-red-500 text-3xl font-bold">🏆 45</p>
                                        <p className="text-xs text-gray-500 mt-1 font-medium">Role Based</p>
                                    </div>
                                    <div className="p-3 bg-orange-50 rounded-xl text-center">
                                        <p className="text-orange-500 text-3xl font-bold">🥇 2</p>
                                        <p className="text-xs text-gray-500 mt-1 font-medium">Super Skills</p>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar/Activity (Mock) */}
                            <div className="bg-white p-5 rounded-2xl border shadow-sm h-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-gray-700">Learning Activities</h3>
                                    <select className="text-xs border rounded p-1 bg-gray-50 text-gray-600 outline-none">
                                        <option>Jan</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-400 mb-2">
                                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                                </div>
                                <div className="grid grid-cols-7 gap-1.5">
                                    {Array.from({ length: 28 }).map((_, i) => (
                                        <div key={i} className={`aspect-square rounded-sm ${Math.random() > 0.7 ? 'bg-orange-400' : 'bg-gray-100'}`}></div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-4">
                                    <span>Less</span>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-100 rounded-sm"></div>
                                        <div className="w-2 h-2 bg-orange-200 rounded-sm"></div>
                                        <div className="w-2 h-2 bg-orange-400 rounded-sm"></div>
                                        <div className="w-2 h-2 bg-orange-600 rounded-sm"></div>
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Learning In Progress */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <h3 className="text-lg font-bold text-gray-800">Learning In progress</h3>
                            <Button variant="link" className="text-gray-500 text-xs h-auto p-0 hover:text-orange-500">View More →</Button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            <CourseCard
                                title="Digital Marketing Mastery for Business"
                                instructor="Digital Marketing Academy"
                                progress={93}
                                imageColor="bg-purple-900"
                            />
                            <CourseCard
                                title="MySQL Playlist Tutorial"
                                instructor="Tech with Tim"
                                progress={91}
                                imageColor="bg-blue-900"
                            />
                            <CourseCard
                                title="RESTful Web Services and API Testing"
                                instructor="Learn Automation Online"
                                progress={91}
                                imageColor="bg-slate-800"
                            />
                            <CourseCard
                                title="Comprehensive Python Programming"
                                instructor="Code with Harry"
                                progress={89}
                                imageColor="bg-yellow-600"
                            />
                        </div>
                    </div>

                    {/* Showcase */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <h3 className="text-lg font-bold text-gray-800">Showcase in one profile</h3>
                            <Button variant="link" className="text-gray-500 text-xs h-auto p-0 hover:text-orange-500">View More →</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <PlatformCard
                                name="LeetCode"
                                description="Highlight your problem solving skills with coding challenges completed."
                                icon={LayoutDashboard} // Ideally specific icons
                                color="bg-yellow-500"
                            />
                            <PlatformCard
                                name="HackerRank"
                                description="Prove your expertise through coding badges, challenges, and achievements."
                                icon={Briefcase}
                                color="bg-green-500"
                            />
                            <PlatformCard
                                name="Dribbble"
                                description="Display your creative designs and build a strong visual portfolio."
                                icon={CheckCircle2} // Placeholder for Dribbble icon
                                color="bg-pink-500"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
