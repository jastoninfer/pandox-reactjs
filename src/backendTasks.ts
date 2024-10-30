import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const WS_URL: string | undefined = process.env.REACT_APP_WS_URL;
const TOKEN_CHECK_INTERVAL = 60 * 1000;

const handleTokenCheck = () => {
    console.log('interval task..');
};

export const useBackgroundTasks = () => {
    const { sendJsonMessage, lastJsonMessage,
        readyState, getWebSocket } = useWebSocket(WS_URL as string, {
           share: true,
           onOpen: () => {
               console.info('Websocket connection established.');
           }
    });
};

//     console.log('go...');

//     useEffect(() => {
//         // const webSocket = getWebSocket();
//         // const tokenCheckInterval = setInterval(handleTokenCheck, TOKEN_CHECK_INTERVAL);
//         console.log('go....');
//         return () => {
//             // clearInterval(tokenCheckInterval);
//         }
//     }, [getWebSocket]);

// export {
//     useBackgroundTasks,
// };
