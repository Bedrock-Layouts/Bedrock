import { useEffect } from "react";

export const SwitchToDocs = () => {
  useEffect(() => {
    try {
      const { href } = window.location;

      if (href.includes("viewMode=story")) {
        window.location.href = href.replace("viewMode=story", "viewMode=docs");
      }
    } catch (error) {
      // Do nothing if it wasn't able to click on Docs button.
    }
  });
  return null;
};
