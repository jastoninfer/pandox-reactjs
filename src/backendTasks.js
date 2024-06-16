import { useEffect } from "react";
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://127.0.0.1:8080';
const TOKEN_CHECK_INTERVAL = 60 * 1000;

const handleTokenCheck = () => {
    console.log('interval task..');
};

export const useBackgroundTasks = () => {
    const { sendJsonMessage, lastJsonMessage, 
        readyState, getWebSocket } = useWebSocket(WS_URL, {
           share: true,
           onOpen: () => {
               console.log('Websocket connection established.');
           }
    });

    useEffect(() => {
        // const webSocket = getWebSocket();
        // const tokenCheckInterval = setInterval(handleTokenCheck, TOKEN_CHECK_INTERVAL);
        console.log('go....');
        return () => {
            // clearInterval(tokenCheckInterval);
        }
    }, [getWebSocket]);
};
