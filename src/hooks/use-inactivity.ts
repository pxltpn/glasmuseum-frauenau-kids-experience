import { useEffect, useState, useCallback } from "react";

/**
 * Hook to check if the screen has been inactive for a certain amount of time and execute a callback
 * @param idleTime Duration of inactivity in seconds
 * @param onInactivity Callback to execute when the screen has been inactive for the specified duration
 * @returns Function to reset the inactivity timer
 */
export const useInactivity = (
  idleTime: number,
  onInactivity: CallableFunction
) => {
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const checkInactivity = useCallback(() => {
    const currentTime = Date.now();
    const timeSinceLastActivity = (currentTime - lastActivityTime) / 1_000;

    if (timeSinceLastActivity > idleTime) {
      onInactivity();
    }
  }, [lastActivityTime, idleTime, onInactivity]);

  useEffect(() => {
    let inactivityInterval: NodeJS.Timeout;

    checkInactivity();

    inactivityInterval = setInterval(checkInactivity, 1000);

    return () => clearInterval(inactivityInterval);
  }, [checkInactivity, idleTime]);

  const resetInactivityTimer = useCallback(() => {
    setLastActivityTime(Date.now());
  }, []);

  return { resetInactivityTimer };
};
