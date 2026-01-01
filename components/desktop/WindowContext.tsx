"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface WindowState {
  id: string;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  size?: { width: number; height: number };
  position?: { x: number; y: number };
}

interface WindowContextType {
  windows: WindowState[];
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

let nextZIndex = 100;

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        // If minimized, restore it and bring to front
        if (existing.minimized) {
          return prev.map((w) =>
            w.id === id
              ? { ...w, minimized: false, zIndex: ++nextZIndex }
              : w
          );
        }
        // Already open, just focus it
        return prev.map((w) =>
          w.id === id ? { ...w, zIndex: ++nextZIndex } : w
        );
      }
      // Open new window
      return [...prev, { id, zIndex: ++nextZIndex, minimized: false, maximized: false }];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: ++nextZIndex } : w
      )
    );
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, minimized: true } : w
      )
    );
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized, zIndex: ++nextZIndex } : w
      )
    );
  }, []);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, position } : w
      )
    );
  }, []);

  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, size } : w
      )
    );
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        focusWindow,
        minimizeWindow,
        toggleMaximize,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindows must be used within a WindowProvider");
  }
  return context;
}
