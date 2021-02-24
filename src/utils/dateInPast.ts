const dateInPast = (checkingDate: Date, today: Date): boolean => (checkingDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) ? true : false;

export default dateInPast