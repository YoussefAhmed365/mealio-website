import AnimatedBackground from "../animations/AnimatedBackground";
import AgentChat from "../components/shared/AgentChat";
import TopNavbar from "../components/shared/TopNavbar";

const GenerativeAI = () => {
    return (
        <main className="w-full h-screen flex flex-col relative overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)' }}
        >
            <AnimatedBackground className="z-0" />

            {/* Header bar */}
            <TopNavbar />

            {/* Chat area */}
            <div className="flex-1 relative z-10 overflow-hidden flex justify-center">
                <div className="w-full h-full max-w-3xl">
                    <AgentChat />
                </div>
            </div>
        </main>
    );
};

export default GenerativeAI;