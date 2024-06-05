import Container from "./common/container";
import Card from "./common/card";
import CardHeader from "./common/card-header";
import CardBody from "./common/card-body";
import {useEffect, useState} from "react";
import io from "socket.io-client";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Tooltip, Legend, LinearScale, LineElement, PointElement, Title} from "chart.js";

const socket = io("ws://localhost:5555");
const options = {
    responsive: false,
    animation: false,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'BINANCE Market Data',
        }
    }
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export default function MarketApp(){
    const [trades, setTrades] = useState([]);
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [symbols, setSymbols] = useState(["BTCUSDT", "ETHBTC"]);
    const [windowSize, setWindowSize] = useState(250);
    const [connected, setConnected] = useState(false);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'BTC-USDT Price',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderDashOffset: 0.0,
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }]
    });
    useEffect(() => {
        socket.on("ticker", (trade) => {
            let newTrades = [...trades, trade];
            if (newTrades.length > windowSize){
                newTrades = newTrades.slice(newTrades.length-windowSize);
            }
            setTrades(newTrades);
            const newChartData = {...chartData};
            newChartData.datasets = [...chartData.datasets];
            newChartData.datasets[0].data = [...chartData.datasets[0].data, Number(trade.price)]
            if (newChartData.datasets[0].data.length > windowSize){
                newChartData.datasets[0].data.splice(0,newChartData.datasets[0].data.length - windowSize);
            }
            newChartData.labels = [...chartData.labels, trade.timestamp];
            if (newChartData.labels.length > windowSize){
                newChartData.labels.splice(0,newChartData.labels.length - windowSize);
            }
            setChartData(newChartData);
        })
    })
    return (
        <Container>
            <p></p>
            <Card>
                <CardHeader title="Market"></CardHeader>
                <CardBody>
                    <Line data={chartData}
                          width={640}
                          height={480}
                          options={options}></Line>
                </CardBody>
            </Card>
        </Container>
    )
}
