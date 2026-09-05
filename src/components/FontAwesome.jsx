import { useEffect } from "react";

const FontAwesome = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = `https://kit.fontawesome.com/${import.meta.env.VITE_FONT_AWESOME_ID}.js`;
    script.crossOrigin = "anonymous";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default FontAwesome;
