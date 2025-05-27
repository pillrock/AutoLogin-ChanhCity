import { animate } from 'animejs';
import { useEffect } from 'react';

const Notifications = ({
  message,
  onClear,
}: {
  message: string;
  onClear: () => void;
}) => {
  useEffect(() => {
    if (!message) return;

    animate('.noti', {
      x: { from: 34, to: 0, duration: 300 },
      opacity: { from: 0, to: 1, duration: 300 },
    });

    const timeout = setTimeout(() => {
      animate('.noti', {
        x: { from: 0, to: 34, duration: 300 },
        opacity: { from: 1, to: 0, duration: 300 },
      });
      setTimeout(onClear, 500); // Clear sau animation
    }, 3000);

    return () => clearTimeout(timeout);
  }, [message]);

  if (!message) return null;

  return (
    <div className="noti fixed top-10 right-2 z-[100] rounded-md border border-[#00bfff] bg-black/40 px-4 py-2">
      <span className="text-[12px] text-white">{message}</span>
    </div>
  );
};

export default Notifications;
