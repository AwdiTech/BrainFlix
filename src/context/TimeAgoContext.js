import { createContext } from "react";

/**
 * TimeAgoContext
 * 
 * Context providing a function to calculate the relative time since a given date.
 * This is used to display how long ago a comment was made in a human-readable format.
 */
export const TimeAgoContext = createContext(() => { });


/**
 * calculateTimeAgo
 * 
 * Function to calculate the time elapsed since a given date in a human-readable format.
 * Converts an ISO date string to a relative time string (e.g., '3 hours ago').
 * 
 * @param {string|Date} date - The date to calculate time from.
 * @returns {string} - A string representing the time elapsed since the date.
 */
function calculateTimeAgo(date) {
    const commentDate = new Date(date);
    const now = new Date();
    const seconds = Math.round((now - commentDate) / 1000) // Date is stored in miliseconds, and there are 1000 miliseconds in 1 second
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(weeks / 4.345) // 4.345 is the average number of weeks in a month

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 7) {
        return `${days} days ago`;
    } else if (weeks <= 4) {
        return `${weeks} weeks ago`;
    } else if (months < 12) {
        return `${months} months ago`;
    } else {
        return commentDate.toLocaleString('en-US', { day: "2-digit", month: "2-digit", year: "numeric" });
    }
}


/**
 * TimeAgoProvider
 * 
 * Context provider for the TimeAgoContext. Wraps children components and provides
 * them access to the calculateTimeAgo function.
 * 
 * @param {object} props - Props containing children components.
 * @returns {React.Component} - Context Provider wrapping children.
 */
export const TimeAgoProvider = ({ children }) => {
    return (
        <TimeAgoContext.Provider value={calculateTimeAgo}>
            {children}
        </TimeAgoContext.Provider>
    );
};
