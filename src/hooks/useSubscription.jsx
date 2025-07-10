import { useState } from "react";

const useSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(() => {
    // Local storage থেকে সাবস্ক্রিপশন স্টেট নাও
    const savedStatus = localStorage.getItem("subscribed");
    return savedStatus === "true";
  });

  const makeSubscribed = () => {
    localStorage.setItem("subscribed", "true");
    setIsSubscribed(true);
  };

  return { isSubscribed, makeSubscribed };
};

export default useSubscription;
