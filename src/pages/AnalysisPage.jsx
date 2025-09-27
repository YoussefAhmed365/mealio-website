// Components & Libraries
import Navbar from "../components/shared/Navbar"
import TopNavbar from '../components/shared/TopNavbar'
import Button from "../components/shared/Button"
import Stack from '@mui/material/Stack'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import { Player } from '@lottiefiles/react-lottie-player'
import animationData from '../assets/json/lotties/congratulation-sparkle.json'
import { LineChart } from '@mui/x-charts/LineChart'

// Icons
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import WaterDropIcon from '../assets/icons/WaterDrop'
import { FireIcon, SparklesIcon } from "@heroicons/react/24/solid"
import WeightScaleIcon from '../assets/icons/WeightScale'
import HeartPulseIcon from '../assets/icons/HeartPulse'
import AwardIcon from '../assets/icons/Award'

import '../assets/css/AnalysisPage.css'
import { useState, useEffect } from "react"

const BodyOverviewCharts = () => {
    const Charts = [
        {
            name: "Protein",
            value: 35,
            color: "#a3e635"
        },
        {
            name: "Carbo",
            value: 65,
            color: "#facc15"
        },
        {
            name: "Fat",
            value: 20,
            color: "#dc2626"
        }
    ];

    return (
        <div className="w-full flex justify-between items-center">
            {Charts.map((chart, index) => (
                <div key={index} className="flex flex-col justify-center items-center space-y-3">
                    <Stack>
                        <Gauge
                            width={100}
                            height={100}
                            value={chart.value}
                            className="bg-gray-900 text-yello rounded-full"
                            text={
                                ({ value }) => `${value}%`
                            }
                            sx={() => ({
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 14,
                                    transform: 'translate(0px, 0px)',
                                    fill: '#ffffff',
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: chart.color,
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: '#374151',
                                },
                            })}
                        />
                    </Stack>
                    <h6 className="text-sm text-gray-400">{chart.name}</h6>
                </div>
            ))}
        </div>
    );
};

const DailyTargetCards = () => {
    const Cards = [
        {
            name: "Water",
            icon: <WaterDropIcon className="size-12 text-blue-400" />,
            subtitle: "Total Cons",
            value: "2300 ml"
        },
        {
            name: "Calories",
            icon: <FireIcon className="size-12 text-orange-400" />,
            subtitle: "Total Cons",
            value: "890 kcal"
        },
        {
            name: "Weight",
            icon: <WeightScaleIcon className="size-12 text-lime-400" />,
            subtitle: "My Weight",
            value: "62 KG"
        },
        {
            name: "BPM",
            icon: <HeartPulseIcon className="size-12 text-rose-600" />,
            subtitle: "BPM",
            value: "110 BPM"
        },
    ];

    return (
        Cards.map((card, index) => (
            <div key={index} className="bg-white shadow-sm rounded-xl px-5 py-4 flex flex-col justify-between items-start">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-bold">{card.name}</h2>
                    {card.icon}
                </div>

                <div>
                    <h6 className="text-sm font-semibold text-gray-600">{card.subtitle}</h6>
                    <h2 className="text-xl font-bold">{card.value}</h2>
                </div>
            </div>
        ))
    );
};

const LineChartBox = () => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const generateWeeklyData = (min, max) => {
        return Array.from({ length: 7 }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    };

    const fatData = generateWeeklyData(30, 80); // grams
    const caloriesData = generateWeeklyData(1500, 2500); // kcal
    const carboData = generateWeeklyData(150, 300); // grams
    const proteinData = generateWeeklyData(80, 150); // grams

    return (
        <LineChart
            xAxis={[{ scaleType: 'point', data: daysOfWeek }]}
            series={[
                {
                    data: fatData,
                    label: 'Fat (g)',
                    color: '#FFC107', // Amber
                },
                {
                    data: caloriesData,
                    label: 'Calories (kcal)',
                    color: '#F44336', // Red
                },
                {
                    data: carboData,
                    label: 'Carbohydrates (g)',
                    color: '#4CAF50', // Green
                },
                {
                    data: proteinData,
                    label: 'Protein (g)',
                    color: '#2196F3', // Blue
                },
            ]}
            height={400}
            margin={{ left: 70, right: 70, top: 50, bottom: 50 }}
            grid={{ vertical: true, horizontal: true }}
            slotProps={{
                legend: {
                    direction: 'row',
                    position: { vertical: 'top', horizontal: 'middle' },
                    padding: { top: 20, bottom: 0, left: 0, right: 0 },
                },
            }}
        />
    );
};

const AwardBox = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleHide = () => {
        setIsFadingOut(true);
    };

    useEffect(() => {
        if (isFadingOut) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 500); // This delay should match the duration of your Tailwind transition (e.g., duration-500)
            return () => clearTimeout(timer);
        }
    }, [isFadingOut]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    if (!isVisible) {
        return null; // Don't render anything if the component is not visible
    }

    return (
        <div
            className={`relative bg-white shadow-sm rounded-xl px-6 py-8 transition-opacity duration-500 ease-out ${isFadingOut ? "opacity-0" : "opacity-100"}`}>
            <div className="absolute inset-0 pointer-events-none">
                <Player options={defaultOptions} height={300} width={300} />
            </div>
            <div className="relative flex flex-col justify-center items-center z-10">
                <div className="w-24 h-24 mb-4 border-[6px] border-slate-200 bg-gradient-to-r from-green-500 to-amber-400 shadow-xl rounded-full flex justify-center items-center">
                    <AwardIcon className="size-12 text-white motion-safe:animate-pulse" />
                </div>
                <h1 className="text-lg font-bold">Congratulations!</h1>
                <h2 className="font-medium text-gray-600 text-center mb-8">You've reached a new milestone!</h2>
                <Button styleType="success" className={"py-2"} onClick={handleHide}>Great Job!</Button>
            </div>
        </div>
    );
};

const SuggestQuickMeal = () => {
    return (
        <div className="relative rounded-xl pt-8 px-8 pb-24 bg-[radial-gradient(at_25%_25%,_var(--tw-gradient-from)_0,_var(--tw-gradient-to)_50%)] from-amber-300 to-amber-100 shadow-sm space-y-3">
            <div className="flex justify-center items-center space-x-4">
                <SparklesIcon className="size-8 text-amber-500" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 text-transparent bg-clip-text">Let's Suggest a Quick Meal</h2>
            </div>
            <div className="overflow-y-scroll scroll-smooth max-h-72 text-gray-700">
                <h1 className="text-2xl font-bold text-amber-700">Grilled Salmon with Lemon & Dill</h1>
                <h3 className="text-lg font-semibold my-2">Ingredients</h3>
                <ul className="ml-4 list-disc font-medium">
                    <li>Salmon Fillet</li>
                    <li>Lemon</li>
                    <li>Fresh Dill</li>
                    <li>Olive Oil</li>
                    <li>Salt</li>
                    <li>Pepper</li>
                </ul>
                <h3 className="text-lg font-semibold my-2">Steps</h3>
                <ul className="ml-4 list-decimal font-medium">
                    <li>Preheat grill to medium-high.</li>
                    <li>Brush salmon with olive oil and season with salt and pepper.</li>
                    <li>Grill for 6-8 minutes per side, or until cooked through.</li>
                    <li>Squeeze fresh lemon juice over the top and sprinkle with dill before serving.</li>
                </ul>
                <br />
                <p>Looks great meal! It's just grilled without no need to use oil and doesn't increase fat to fit your body health. You have to try it!</p>
            </div>
            <Button styleType="primary" className={"absolute bottom-8 left-1/2 -translate-x-1/2 max-w-fit"}>Generate Now</Button>
        </div>
    );
};

const foodTips = [
    "Try adding a pinch of cinnamon to your coffee or oatmeal for a healthy flavor boost. It helps regulate blood sugar!",
    "Meal prepping on Sunday can save you time and money throughout the week. Plan your meals and chop your veggies!",
    "Remember to drink plenty of water! Staying hydrated is key to a healthy metabolism and can curb false hunger cues.",
    "Don't throw out your vegetable scraps! Save them in a bag in the freezer to make a flavorful homemade vegetable broth.",
    "For a healthier snack, swap potato chips for roasted chickpeas. They're crunchy, delicious, and packed with protein and fiber.",
];

const DailyFoodTip = () => {
    const [tip, setTip] = useState('');

    useEffect(() => {
        // Get the current day of the year (0-365) to show a different tip each day.
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const diff = today - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const dailyTipIndex = dayOfYear % foodTips.length;
        setTip(foodTips[dailyTipIndex]);
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">💡 Daily Food Tip</h3>
            <p className="text-gray-600 leading-relaxed">
                {tip}
            </p>
        </div>
    );
};

const AnalysisPage = () => {
    return (
        <div className='flex justify-start'>
            <Navbar />
            <div className='w-full flex flex-col justify-start items-center'>
                <TopNavbar />
                <div className='w-full grid grid-cols-1 xl:grid-cols-7 gap-4 my-4 px-4'>

                    {/* Main */}
                    <div className='md:col-span-5 space-y-6'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-min">
                            {/* Body Overview */}
                            <div className="space-y-4">
                                <div className="col-span-1 flex justify-between items-center">
                                    <h1 className="text-3xl font-semibold">Body Overview</h1>
                                    <div className="grid shrink-0 grid-cols-1 bg-white shadow-sm rounded-full focus-within:relative">
                                        <select id="period" name="period" aria-label="Period" className="col-start-1 row-start-1 w-full appearance-none rounded-full bg-white py-1 pr-7 pl-3 text-base *:bg-white placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-600 sm:text-sm/6">
                                            <option>Monthly</option>
                                            <option>Daily</option>
                                        </select>
                                        <ChevronDownIcon data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-800 sm:size-4" />
                                    </div>
                                </div>

                                <div className="w-full rounded-xl py-12 px-10 bg-black flex flex-col justify-start items-center space-y-8">
                                    <div className="text-center space-y-4">
                                        <h5 className="text-lg text-gray-300">You've gain <span className="text-white text-base font-semibold">2kg</span> in a month keep it up!</h5>
                                        <h6 className="text-base text-gray-400">Still need to gain</h6>
                                        <h1 className="text-5xl font-bold text-white">950 kcal</h1>
                                    </div>
                                    <BodyOverviewCharts />
                                </div>
                            </div>

                            {/* Daily Target */}
                            <div className="space-y-4">
                                <div className="col-span-1 flex justify-between items-center">
                                    <h1 className="text-3xl font-semibold">My Daily Target</h1>
                                    <Button styleType="text" className="text-sm">See All</Button>
                                </div>

                                <div className="grid grid-cols-2 gap-2 h-[88%]">
                                    <DailyTargetCards />
                                </div>
                            </div>
                        </div>

                        {/* Line Chart */}
                        <div className="space-y-4">
                            <h1 className="text-3xl font-semibold">Overall Progress</h1>
                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">Nutrient Intake</h2>
                                    <div className="grid shrink-0 grid-cols-1 bg-white shadow-sm rounded-full focus-within:relative">
                                        <select id="chart-period" name="chart-period" aria-label="Chart Period" className="col-start-1 row-start-1 w-full appearance-none rounded-full bg-white py-1 pr-7 pl-3 text-base *:bg-white placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-600 sm:text-sm/6">
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                            <option>Last 6 Months</option>
                                        </select>
                                        <ChevronDownIcon data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-800 sm:size-4" />
                                    </div>
                                </div>
                                
                                <LineChartBox />
                            </div>
                        </div>
                    </div>

                    {/* Side */}
                    <div className='md:col-span-2 space-y-5'>
                        <AwardBox />
                        <SuggestQuickMeal />
                        <DailyFoodTip />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisPage;