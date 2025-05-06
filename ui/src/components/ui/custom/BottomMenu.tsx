"use client";

import * as React from "react";
import { Home, PlusCircle, User, Cog, Menu, X, Eye, EyeOff, MinusCircle, MessageCircle, BarChart2, Clock, Maximize2, Activity, RefreshCw, PieChart as PieChartIcon, Layers, Box, Sliders, Edit, ChevronRight, Minus, Plus, ChevronDown, Settings, LineChart, TrendingUp, AlertTriangle, DollarSign, BookOpen } from 'lucide-react';
import { motion } from "framer-motion";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { toast } from "sonner"


export default function TradingInterface({
    timeframe,
    fetchPrediction,
    selectedCoin,
    isLoading,
    toggleChatWindow,
    toggleSidebar,
    toggleSettings,
    toggleTradingView,
    toggleChatView,
}: {
    timeframe: {
        setSelectedTimeframe: (value: string) => void;
        selectedTimeframe: string;
    }
    fetchPrediction: {
        fetchPrediction: (value: string) => void;
        setResponseObject: (value: object) => void;
    },
    selectedCoin: {
        selectedCoin: string;
    };
    isLoading: {
        loading: boolean;
    };
    toggleChatWindow: {
        setChatWindow: (value: boolean) => void;
        chatWindow: boolean;
    };
    toggleSidebar: {
        setIsMenuOpen: (value: boolean) => void;
        isMenuOpen: boolean;
    };
    toggleSettings: {
        setShowSettings: (value: boolean) => void;
        showSettings: boolean;
    };
    toggleTradingView: {
        setIsTradingView: (value: boolean) => void;
        isTradingView: boolean;
    };
    toggleChatView: {
        isChatView: boolean;
        setIsChatView: (value: boolean) => void;
    };
}) {
    const [selectedTimeframeName, setSelectedTimeframeName] = React.useState("Multi");
    const [openDrawer, setOpenDrawer] = React.useState<string | null>(null);
    const [activeIndicator, setActiveIndicator] = React.useState<string | null>(null);
    const [indicatorSettings, setIndicatorSettings] = React.useState({
        period: 14,
        shift: 0,
        maMethod: "Simple",
        color: "#00BCD4",
    });
    const [chartSettings, setChartSettings] = React.useState({
        tradingSignals: true,
        hmrPeriods: true,
        profitLoss: true,
        priceAlerts: false,
        closedOrders: true,
    });

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const timeframes = [
        { name: "5M", value: "5/minute" },
        { name: "15M", value: "15/minute" },
        { name: "30M", value: "30/minute" },
        { name: "1H", value: "1/hour" },
        { name: "4H", value: "4/hour" },
        { name: "1D", value: "1/day" },
        { name: "1W", value: "1/week" },
        { name: "1Mon", value: "1/month" },
        { name: "3Mon", value: "3/month" },
        { name: "6Mon", value: "6/month" },
        { name: "12Mon", value: "12/month" },
        { name: "Multi", value: "6775e2538ae6d5fc5bbe7345" },
    ];

    const indicators = [
        { name: "Moving Average", icon: LineChart },
        { name: "Bollinger Bands", icon: Activity },
        { name: "Parabolic SAR", icon: TrendingUp },
        { name: "RSI", icon: Activity },
        { name: "MACD", icon: LineChart },
        { name: "Stochastic", icon: LineChart },
        { name: "Volume", icon: BarChart2 },
        { name: "More Indicators...", icon: Plus },
    ];

    const strategyOptions = [
        { name: "Trend Following", description: "Follow market trends" },
        { name: "Mean Reversion", description: "Trade price returns to mean" },
        { name: "Breakout", description: "Capitalize on price breakouts" },
        { name: "Momentum", description: "Trade strong price movements" },
    ];



    let initialData: Record<string, string | string[]> = {
        "current_value": "[current_value]",
        "prediction": "[strong buy/strong sell/buy/sell/hold/wait]",
        "take_position": "[predicted price]",
        "stop_loss": "[predicted stop loss]",
        "take_profit": "[predicted take profit]",
        "confidence_score": "[confidence in %]",
        "support_levels": "[support levels array]",
        "resistance_levels": "[resistance levels array]",
        "trend_strength": "[uptrend/downtrend]",
        "explanation": "[reason for prediction, including key data and analysis]",
        "isNeuralNetwork": "yes",
    };
    const savedJsonData: any = localStorage.getItem('responseData');
    if (!savedJsonData) {
        localStorage.setItem('responseData', JSON.stringify(initialData));
    } else {
        initialData = JSON.parse(savedJsonData);
    }
    interface LayerOption {
        name: string;
        key: keyof typeof initialData;
        enabled: boolean;
    }

    const layerOptions: LayerOption[] = [
        { name: "Current Value", key: "current_value", enabled: true },
        { name: "Pattern", key: "pattern", enabled: true },
        { name: "Algo", key: "algo", enabled: true },
        { name: "Trend Strength", key: "trend_strength", enabled: true },
        { name: "Prediction", key: "prediction", enabled: true },
        { name: "Take Position", key: "take_position", enabled: true },
        { name: "Stop Loss", key: "stop_loss", enabled: true },
        { name: "Take Profit", key: "take_profit", enabled: true },
        { name: "Possibility", key: "possibility", enabled: true },
        { name: "Confidence Score", key: "confidence_score", enabled: true },
        { name: "Support Levels", key: "support_levels", enabled: true },
        { name: "Resistance Levels", key: "resistance_levels", enabled: true },
        { name: "Explain Trend Strength", key: "explain_trend_strength", enabled: true },
        { name: "Details", key: "details", enabled: true },
        { name: "Neural Network", key: "isNeuralNetwork", enabled: true },
    ];

    const [jsonData, setJsonData] = useState<Record<string, string | string[]>>({ ...initialData });

    const [options, setOptions] = useState(layerOptions);
    useEffect(() => {
        setOptions(layerOptions.map(option => ({
            ...option,
            enabled: option.key in jsonData,
        })));
        fetchPrediction.setResponseObject(jsonData)
    }, [jsonData]);
    useEffect(() => {
        fetchPrediction.setResponseObject(jsonData); // Update response with the correct state
    }, [])

    const resetToDefault = () => {
        localStorage.removeItem('responseData');
        setJsonData({
            "current_value": "[current_value]",
            "pattern": "[Detected pattern, if any]",
            "algo": "[predicted algo]",
            "trend_strength": "[Measures the strength of the current trend (e.g., strong uptrend, weak downtrend)]",
            "prediction": "[strong sell/strong buy/buy/short/hold/wait]",
            "take_position": "[predicted buy at or sell at]",
            "stop_loss": "[predicted stop loss]",
            "take_profit": "[predicted take profit]",
            "possibility": "[predicted possibility in %]",
            "confidence_score": "[confidence in %]",
            "support_levels": ["Detect exact [support levels inside array]"],
            "resistance_levels": ["Detect exact [resistance levels inside array]"],
            "explain_trend_strength": "[Explain in detail why you chose [trend_strength] based on which parameters and values with timestamp and make sure each and every single detail you mention in here to justify your investigation of prediction along with periods and values and parameters used (In detailed nested json format)]",
            "details": "[in-depth breakdown of the entire model, including every layer from market conditions, neural network, sentiment analysis, risk management, and the expected probabilities. (In detailed nested json format)]",
            "isNeuralNetwork": "yes",
        })
        // setOptions(layerOptions);
    };
    const toggleOption = (key: keyof typeof initialData) => {
        // Update the options state
        setOptions((prev) =>
            prev.map((option) =>
                option.key === key ? { ...option, enabled: !option.enabled } : option
            )
        );

        // Update the jsonData state
        setJsonData((prev) => {
            const updated = { ...prev };
            const targetOption = options.find((opt) => opt.key === key);
            const isEnabled = targetOption ? !targetOption.enabled : false; // Toggle logic

            if (!isEnabled) {
                delete updated[key];
            } else {
                updated[key] = initialData[key];
            }

            return updated;
        });

        // Use a callback to ensure the latest state is used
        setOptions((prev) => {
            const updatedJsonData = prev.reduce((acc, option) => {
                if (option.enabled) acc[option.key] = initialData[option.key];
                return acc;
            }, {} as Record<string, string | string[]>);
            localStorage.setItem('responseData', JSON.stringify(updatedJsonData));
            setJsonData(updatedJsonData);
            fetchPrediction.setResponseObject(updatedJsonData); // Update response with the correct state
            return prev;
        });
    };



    const menuItems = [
        {
            name: "Menu",
            icon: toggleSidebar.isMenuOpen ? X : Menu,
            onClick: () => toggleSidebar.setIsMenuOpen(!toggleSidebar.isMenuOpen),
        },
        {
            name: !toggleChatWindow.chatWindow ? "Chat" : "Chat",
            icon: !toggleChatWindow.chatWindow ? MessageCircle : MinusCircle,
            onClick: () => {
                toggleChatWindow.setChatWindow(!toggleChatWindow.chatWindow);
                toggleTradingView.isTradingView &&
                    toggleTradingView.setIsTradingView(!toggleTradingView.isTradingView);
                toggleSettings.showSettings &&
                    toggleSettings.setShowSettings(!toggleSettings.showSettings);
            },
        },
        {
            name: "Home",
            icon: Home,
            onClick: () => {
                toggleTradingView.isTradingView &&
                    toggleTradingView.setIsTradingView(!toggleTradingView.isTradingView);
                toggleSettings.showSettings &&
                    toggleSettings.setShowSettings(!toggleSettings.showSettings);
                toggleChatView.isChatView &&
                    toggleChatView.setIsChatView(!toggleChatView.isChatView);
                toggleChatWindow.chatWindow &&
                    toggleChatWindow.setChatWindow(!toggleChatWindow.chatWindow);
            },
        },
        {
            name: "TradingView",
            icon: toggleTradingView.isTradingView ? EyeOff : Eye,
            onClick: () =>
                toggleTradingView.setIsTradingView(!toggleTradingView.isTradingView),
        },
        {
            name: "Settings",
            icon: Cog,
            onClick: () => {
                toggleSettings.setShowSettings(!toggleSettings.showSettings);
            },
            disabled: isLoading.loading,
        },
    ];

    const tradingBarItems = [
        { name: "Refresh", icon: RefreshCw, action: "refresh" },
        { name: selectedTimeframeName, icon: Clock, action: "timeframe" },
        { name: "Layers", icon: Layers, action: "layers" },
        { name: "Indicators", icon: Activity, action: "indicators" },
        { name: "Chart", icon: BarChart2, action: "chart" },
        { name: "Strategies", icon: Box, action: "strategies" },
        { name: "Edit", icon: Edit, action: "edit" },
        { name: "Settings", icon: Sliders, action: "settings" },
        { name: "Fullscreen", icon: Maximize2, action: "fullscreen" },
        { name: "Reports", icon: PieChartIcon, action: "reports" },
    ];

    const handleTradingBarClick = async (action: string) => {
        if (action === "refresh") {
            try {
                const coinFromStorage = localStorage.getItem("selectedCoin");

                fetchPrediction.fetchPrediction(coinFromStorage || selectedCoin?.selectedCoin);
                return;
            } catch (error) {
                console.error("Error refreshing data:", error);
            }
        } else if (action === "fullscreen") {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
            return;
        }
        // setOpenDrawer(action);
        setOpenDrawer(prevDrawer => prevDrawer === action ? null : action);
        // if (openDrawer === action) {
        //   setOpenDrawer(null);
        // } else {
        //   setOpenDrawer(action);
        // }
    };

    // Sample chart data
    const chartData = [
        { date: "2024-04-01", desktop: 222, mobile: 150 },
        { date: "2024-04-02", desktop: 97, mobile: 180 },
        { date: "2024-04-03", desktop: 167, mobile: 120 },
        { date: "2024-04-04", desktop: 242, mobile: 260 },
        { date: "2024-04-05", desktop: 373, mobile: 290 },
        // ... (add more data points as needed)
    ];

    const chartConfig = {
        views: {
            label: "Page Views",
        },
        desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
        },
        mobile: {
            label: "Mobile",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("desktop");

    // Sample pie chart data for reports
    const pieChartData = [
        { name: "Buy", value: 400 },
        { name: "Sell", value: 300 },
        { name: "Hold", value: 300 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const renderDrawerContent = () => {
        switch (openDrawer) {
            case "timeframe":
                return (
                    <ScrollArea className="h-[400px]">
                        <div className="grid grid-cols-2 gap-4 p-4">
                            {timeframes.map((tf: any) => (
                                <Button
                                    key={tf.name}
                                    variant={timeframe.selectedTimeframe === tf.value ? "default" : "outline"}
                                    onClick={() => {
                                        timeframe.setSelectedTimeframe(tf.value);
                                        setSelectedTimeframeName(tf.name);
                                        setOpenDrawer(null);
                                    }}
                                    className="w-full"
                                >
                                    {tf.name}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                );

            case "indicators":
                return (
                    <ScrollArea className="h-[500px]">
                        <div className="p-4 space-y-4">
                            {indicators.map(({ name, icon: Icon }) => (
                                <Accordion
                                    key={name}
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value={name}>
                                        <AccordionTrigger className="hover:bg-gray-800 px-4 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Icon className="h-5 w-5" />
                                                <span>{name}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-4">
                                            <div className="space-y-4 pt-2">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span>Period</span>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() =>
                                                                    setIndicatorSettings((prev) => ({
                                                                        ...prev,
                                                                        period: Math.max(1, prev.period - 1),
                                                                    }))
                                                                }
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </Button>
                                                            <span className="w-12 text-center">
                                                                {indicatorSettings.period}
                                                            </span>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() =>
                                                                    setIndicatorSettings((prev) => ({
                                                                        ...prev,
                                                                        period: prev.period + 1,
                                                                    }))
                                                                }
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <Slider
                                                        value={[indicatorSettings.period]}
                                                        min={1}
                                                        max={200}
                                                        step={1}
                                                        onValueChange={(value) =>
                                                            setIndicatorSettings((prev) => ({
                                                                ...prev,
                                                                period: value[0],
                                                            }))
                                                        }
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <span>Color</span>
                                                    <input
                                                        type="color"
                                                        value={indicatorSettings.color}
                                                        onChange={(e) =>
                                                            setIndicatorSettings((prev) => ({
                                                                ...prev,
                                                                color: e.target.value,
                                                            }))
                                                        }
                                                        className="w-full h-10 rounded-md cursor-pointer"
                                                    />
                                                </div>

                                                <Button className="w-full" variant="default">
                                                    Apply
                                                </Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))}
                        </div>
                    </ScrollArea>
                );

            case "layers":
                return (
                    <ScrollArea className="h-[500px]">
                        <div className="p-4 space-y-4">
                            {/* Render layers */}
                            {options.map((layer) => (
                                <div
                                    key={layer.key}
                                    className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg"
                                >
                                    <span>{layer.name}</span>
                                    <Switch
                                        checked={layer.enabled}
                                        onCheckedChange={() => toggleOption(layer.key)}
                                    >
                                        <span
                                            className={`${layer.enabled ? "translate-x-6" : "translate-x-1"
                                                } inline-block h-4 w-4 transform rounded-full bg-white`}
                                        />
                                    </Switch>
                                </div>
                            ))}

                            {/* Flex container for right alignment */}
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={resetToDefault}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Reset to Default
                                </button>
                            </div>
                        </div>
                    </ScrollArea>
                );

            case "strategies":
                return (
                    <ScrollArea className="h-[400px]">
                        <div className="p-4 space-y-4">
                            {strategyOptions.map((strategy) => (
                                <div
                                    key={strategy.name}
                                    className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800"
                                >
                                    <h3 className="font-medium">{strategy.name}</h3>
                                    <p className="text-sm text-gray-400">
                                        {strategy.description}
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                        <Button variant="default" size="sm">
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                );

            case "settings":
                return (
                    <ScrollArea className="h-[400px]">
                        <div className="p-4 space-y-6">
                            <div className="space-y-4">
                                <h3 className="font-medium">Chart Display</h3>
                                {Object.entries(chartSettings).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg"
                                    >
                                        <span className="capitalize">
                                            {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                                        </span>
                                        <Switch
                                            checked={value}
                                            onCheckedChange={(checked) =>
                                                setChartSettings((prev) => ({
                                                    ...prev,
                                                    [key]: checked,
                                                }))
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollArea>
                );

            case "chart":
                return (
                    <ScrollArea className="h-[500px]">
                        <Card>
                            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                                    <CardTitle>Trading Chart</CardTitle>
                                    <CardDescription>
                                        Showing trading data for the last 3 months
                                    </CardDescription>
                                </div>
                                <div className="flex">
                                    {["desktop", "mobile"].map((key) => {
                                        const chart = key as keyof typeof chartConfig
                                        return (
                                            <button
                                                key={chart}
                                                data-active={activeChart === chart}
                                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                                onClick={() => setActiveChart(chart)}
                                            >
                                                <span className="text-xs text-muted-foreground">
                                                    {chartConfig[chart].label}
                                                </span>
                                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                                    {chartData.reduce((acc: any, curr: any) => acc + curr[chart], 0).toLocaleString()}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </CardHeader>
                            <CardContent className="px-2 sm:p-6">
                                <ChartContainer
                                    config={chartConfig}
                                    className="aspect-auto h-[250px] w-full"
                                >
                                    <BarChart
                                        data={chartData}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            minTickGap={32}
                                            tickFormatter={(value) => {
                                                const date = new Date(value)
                                                return date.toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                            }}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    className="w-[150px]"
                                                    nameKey="views"
                                                    labelFormatter={(value) => {
                                                        return new Date(value).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })
                                                    }}
                                                />
                                            }
                                        />
                                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </ScrollArea>
                );

            case "edit":
                return (
                    <ScrollArea className="h-[400px]">
                        <div className="p-4 space-y-4">
                            <h3 className="font-medium">Edit Trading Options</h3>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full">
                                    <Edit className="mr-2 h-4 w-4" /> Edit Stop Loss
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Edit className="mr-2 h-4 w-4" /> Edit Take Profit
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Edit className="mr-2 h-4 w-4" /> Edit Position Size
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Edit className="mr-2 h-4 w-4" /> Edit Entry Price
                                </Button>
                            </div>
                        </div>
                    </ScrollArea>
                );

            case "reports":
                return (
                    <ScrollArea className="h-[500px]">
                        <Card>
                            <CardHeader>
                                <CardTitle>Trading Reports</CardTitle>
                                <CardDescription>Overview of your trading activity</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieChartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {pieChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-medium mb-2">Trading Summary</h4>
                                    <ul className="space-y-1">
                                        <li>Total Trades: 100</li>
                                        <li>Winning Trades: 65</li>
                                        <li>Losing Trades: 35</li>
                                        <li>Win Rate: 65%</li>
                                        <li>Profit Factor: 1.8</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollArea>
                );

            default:
                return (
                    <div className="p-4">
                        <p className="text-gray-400">
                            {openDrawer
                                ? `${openDrawer.charAt(0).toUpperCase() + openDrawer.slice(1)} options coming soon...`
                                : ""}
                        </p>
                    </div>
                );
        }
    };

    return (
        <>
            <Drawer
                open={!!openDrawer}
                onOpenChange={(open) => !open && setOpenDrawer(null)}
            >
                <DrawerContent className="dark bg-gray-900 text-white" style={{ marginBottom: '14vh' }}>
                    <DrawerHeader>
                        <DrawerTitle className="text-white">
                            {openDrawer === "timeframe" && "Select Timeframe"}
                            {openDrawer === "indicators" && "Indicators"}
                            {openDrawer === "layers" && "Controller"}
                            {openDrawer === "strategies" && "Trading Strategies"}
                            {openDrawer === "edit" && "Edit Tools"}
                            {openDrawer === "settings" && "Chart Settings"}
                            {openDrawer === "reports" && "Trading Reports"}
                            {openDrawer === "chart" && "Trading Chart"}
                        </DrawerTitle>
                        {openDrawer === "indicators" && (
                            <DrawerDescription className="text-gray-400">
                                Select and configure technical indicators
                            </DrawerDescription>
                        )}
                    </DrawerHeader>
                    {renderDrawerContent()}
                    {/* <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter> */}
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerContent>
            </Drawer>

            {/* Bottom Navigation Bar */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ zIndex: 99999 }}
                className="fixed bottom-0 w-full bg-gray-900 border-t border-gray-700 flex justify-between items-center p-2"
            >
                {menuItems.map(({ name, icon: Icon, onClick, disabled }) => (
                    <motion.button
                        key={name} // Use the unique name as the key
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={onClick}
                        disabled={disabled}
                        className="flex flex-col items-center justify-center flex-1 text-white p-2"
                    >
                        <Icon className="w-6 h-6 mb-1 text-gray-300" />
                    </motion.button>
                ))}
            </motion.div>
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-14 w-full bg-gray-900 border-t border-gray-700"
                style={{ zIndex: 99998 }}
            >
                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto whitespace-nowrap py-2 px-4 hide-scrollbar flex justify-between"
                >
                    {tradingBarItems.map(({ name, icon: Icon, action }) => (
                        <motion.button
                            key={`${name}-${action}`} // Combine name and action for a unique key
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleTradingBarClick(action)}
                            className={`inline-flex items-center ${window.innerWidth >= 1024 ? 'gap-2' : 'justify-center'
                                } px-2 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 mr-2 flex-shrink-0`}
                            style={{ flex: '1 1 auto' }}
                        >
                            <Icon className="w-5 h-5" />
                            {window.innerWidth >= 1024 && <span className="text-sm">{name}</span>}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

        </>
    );
}
