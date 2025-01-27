export const getGreeting = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 4) {
    return "Greetings";
  } else if (hours < 12) {
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};
