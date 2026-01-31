import { useParams } from 'react-router-dom';
import { componentLinks } from '../data/components';
import { useState } from 'react';

interface ContentType {
  id: string;
  html: string;
}

function Playground({ cssSource, items }: { cssSource: string, items: ContentType[] }) {

  const [displayOption, setDisplayOption] = useState(0);

  const { componentId } = useParams<{ componentId: string }>();
  const activeItem = items.find((item) => item.id === "content-type-" + componentId);
  const componentName = componentLinks.find((item) => item.id == componentId)?.name;

  if (items.length === 0) <div className="p-8">Loading...</div>;
  if (!activeItem) return <div className="p-8">Component "{componentId}" not found.</div>;

  const head = `
    <base href="https://www.scu.edu/">
    <link rel="stylesheet" href="https://kit.fontawesome.com/895f1e62c1.css" crossorigin="anonymous" />
    <script src="https://kit.fontawesome.com/8fd101ac29.js" crossorigin="anonymous"></script>


    <!-- toolkit styles -->
    <link rel="stylesheet" href="${cssSource}" media="screen" />
    <link href="/media/scuedu/style-assets/stylesheets/f.css" rel="stylesheet">
    <link rel="stylesheet" href="<t4 type='media' formatter='path/*' id='288401' />" />

    <!-- Avenir Next -->
    <link rel="stylesheet" href="https://use.typekit.net/pcm8ajw.css">
    <!-- Minion Pro-->
    <link rel="stylesheet" href="https://use.typekit.net/pcm8ajw.css">

    <!-- /toolkit styles -->

    <script src="https://www.scu.edu/assets/public/scu.js"></script>

    <style>
      body { padding: 20px; background: transparent; }
    </style>
  `;

  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>${head}</head>
      <body>${activeItem.html}</body>
      <script>
        $(document).ready(function () {
          if ($('.accordion-item')) {
            $.getScript("https://www.scu.edu/media/scuedu/script-assets/accordion-toolkit.js");
          }
          if ($('.animation-slide-up')) {
            $.getScript("https://scu.edu/media/scuedu/script-assets/animation.js");
          }
          $("table").addClass("table");
        });
        if ($('.story-subhead')) {
          $.getScript("https://assets.scu.edu/public/js/story-subhead.js");
        }
      </script>
    </html>
  `;

  const handleChange = (e: any) => {
    // The value will be the string "responsive", "tablet", or "mobile"
    const selectedValue = e.target.value;
    if (selectedValue === "responsive") setDisplayOption(0);
    else if (selectedValue === "tablet") setDisplayOption(1);
    else if (selectedValue === "mobile") setDisplayOption(2);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-baseline p-4">
        <h1>{componentName}</h1>
        <label className="sr-only" htmlFor="widths">Choose a screen width:</label>
        <select
          className="gray-200 rounded-sm mx-8 h-8 border border-black"
          name="widths"
          onChange={handleChange}
          size={1}
        >
          <option value="responsive">Desktop (100%)</option>
          <option value="tablet">Tablet (768px)</option>
          <option value="mobile">Mobile (475px)</option>
        </select>
      </div>
      <hr />
      <iframe
        title="Component Preview"
        srcDoc={srcDoc}
        className={`${displayOption === 0 ? "w-full" : ""} 
          ${displayOption === 1 ? "w-3xl" : ""} 
          ${displayOption === 2 ? "w-106.25" : ""} 
          h-9/10 border-none bg-white mx-auto m-4`}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Playground;
