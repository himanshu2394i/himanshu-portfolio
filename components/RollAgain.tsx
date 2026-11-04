"use client";

// Restart the credits: drop the finished state, force a reflow so the animation restarts, play again.
export default function RollAgain() {
  const again = () => {
    const roll = document.querySelector<HTMLElement>(".roll");
    if (!roll) return;
    roll.classList.remove("done", "in");
    void roll.offsetWidth;
    roll.classList.add("in");
  };
  return <button className="rollagain" onClick={again}>Roll the credits again</button>;
}
