
import ColorChip from "../components/ColorChip"
import { brandColors } from "../data/brandColors"

const flattenColors = (colors: Record<string, any>) => {
  const flatList: Array<{ name: string; hex: string; textColor: string }> = [];

  Object.entries(colors).forEach(([name, data]) => {
    // 1. Add Parent
    flatList.push({ name, hex: data.HEX, textColor: data["text-hex"] });

    // 2. Add Variants (if any)
    if (data.variants) {
      Object.entries(data.variants).forEach(([vName, vData]: [string, any]) => {
        flatList.push({
          name: `${name} ${vName}`,
          hex: vData.HEX,
          textColor: vData["text-hex"]
        });
      });
    }
  });
  return flatList;
};

function Colors() {



  return (
    <>
      <div className="container mx-auto p-16">
        <h1 className="text-4xl">
          Colors
        </h1 >
        <h2>
          Primary Colors
        </h2>

        <p>Our core brand colors. Use these as a foundation for most communications and interface elements.</p>

        <div className="flex h-48 overflow-y-clip overflow-x-visible border-b-gray-400 border-b mb-8">
          {flattenColors(brandColors.primary).map((color, index) => (
            <ColorChip
              key={color.name}
              isFirst={index === 0}
              name={color.name}
              hex={color.hex}
              textColor={color.textColor}
            />
          ))}
        </div>


        <h2>
          Secondary Colors
        </h2>
        <p>
          Offers flexibility and variety. Inspired by the diversity of our campus, these colors complement the primary palette and add visual interest.
        </p>

        <div className="flex h-48 overflow-y-clip overflow-x-visible border-b-gray-400 border-b mb-8">
          {flattenColors(brandColors.secondary).map((color, index) => (
            <ColorChip
              key={color.name}
              isFirst={index === 0}
              name={color.name}
              hex={color.hex}
              textColor={color.textColor}
            />
          ))}
        </div>


        <h2>
          Neutral Colors
        </h2>
        <p>
          Adds depth and balance. Inspired by the tones and textures found around our campus, these colors work in harmony with the primary and
          secondary palettes while maintaining a cohesive and elegant look.
        </p>

        <div className="flex h-48 overflow-y-clip overflow-x-visible border-b-gray-400 border-b mb-8">
          {flattenColors(brandColors.tertiary).map((color, index) => (
            <ColorChip
              key={color.name}
              isFirst={index === 0}
              name={color.name}
              hex={color.hex}
              textColor={color.textColor}
            />
          ))}
        </div>


        <h2>
          Print Colors
        </h2>

        <p>
          For more information on specific CMYK, RGB, and Pantone values, <a href="https://www.scu.edu/umc/brand/visual-elements/#content-1252436">visit the UMC Visual Elements page.</a>
        </p>


      </div >
    </>
  )
}

export default Colors



