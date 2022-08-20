import React, { useEffect, useState } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from '../ComplaintsBook';

const Timer: StorefrontFunctionComponent = () => {
    const [time, setTime] = useState(new Date());
    const handles = useCssHandles(CSS_HANDLES);
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    let minute =
        time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    let second =
        time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    let date = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return (
        <div className={`${handles.complaintsBookInitialInfoValue}`}>
            {date}
        </div>
    );
};

export default Timer;
