export const getMonthDay = (): string => {
  const todayDate = new Date();
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = todayDate.getDate();
  const month = months[todayDate.getMonth()];
  return `${month} ${date}`;
};

export const getTodayDate = (): string => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const day = String(todayDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const splitTimeStamp = (timestamp: string): string[] => {
  const parts = timestamp.split(" ");
  return parts;
};

export const convert24to12 = (time24: string): string => {
  const [hours, minutes] = time24.split(":").map(Number);

  if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
    const date = new Date(0, 0, 0, hours, minutes);
    const formattedTime12 = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime12;
  } else {
    return "Invalid input";
  }
};

export default getMonthDay;
