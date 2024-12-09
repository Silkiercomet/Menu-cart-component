import {useState, useEffect} from "react";

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<
        "mobile" | "tablet" | "desktop"
    >("mobile");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640 && window.innerWidth < 1124) {
                setScreenSize("tablet");
            } else if (window.innerWidth >= 1124) {
                setScreenSize("desktop");
            } else {
                setScreenSize("mobile");
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenSize
}

export default useScreenSize;