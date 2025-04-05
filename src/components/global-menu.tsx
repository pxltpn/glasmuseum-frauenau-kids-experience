"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export const GlobalMenu = () => {
  const [showGlobalMenu, setShowGlobalMenu] = useState(false);

  // Register a keyboard listener, that if F12 is pressed, the showGlobalMenu state is toggled
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F10") {
        setShowGlobalMenu((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    showGlobalMenu && (
      <div className="rounded-lg p-4 bg-[#374040] text-white z-30 absolute top-10 left-10 right-10 space-y-4">
        <h2>Navigation</h2>
        <ul className="space-y-2">
          <li className="p-3 border border-white rounded">
            <Link href="/">Start</Link>
          </li>
          <li className="p-3 border border-white rounded">
            <Link href="/screen-2">Mittelalter</Link>
          </li>
          <li className="p-3 border border-white rounded">
            <Link href="/screen-3">Renaissance</Link>
          </li>
          <li className="p-3 border border-white rounded">
            <Link href="/screen-2">Blecherner Mann</Link>
          </li>
        </ul>
      </div>
    )
  );
};
