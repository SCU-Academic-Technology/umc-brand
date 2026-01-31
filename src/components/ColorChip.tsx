
import { useState } from "react";

interface ColorChipProps {
  name: string;
  hex: string;
  textColor: string;
  isFirst?: boolean;
}

function ColorChip({ name, hex, textColor, isFirst }: ColorChipProps) {

  const [hovered, setHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return (
    <div className={`w-full h-25 mt-auto ${isFirst ? 'ml-0.5' : '-ml-32'} relative hover:h-46 ${isCopied ? 'hover:rotate-2' : 'hover:rotate-1'} 
origin-center transition-all duration-75 rounded-t-xl -mb-5 shadow-lg`}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => handleCopy()} style={{ backgroundColor: hex }}>

      <div className={`${hovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75 pt-1.5 pl-3`} style={{ color: textColor }}>
        <p className="mb-0">{isCopied ? "Copied!" : name}</p>
        <p className="mt-0">{hex}</p>

      </div>
    </div>

  )
}

export default ColorChip;
