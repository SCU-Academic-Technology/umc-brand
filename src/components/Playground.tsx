import { useParams, useLocation } from 'react-router-dom';
import { lockupOptions } from '../data/components';
import { useState, useEffect } from 'react';

interface ContentType {
  name: string;
  html: string;
}

function Playground({ cssSource, items, siteMainHeader, lockupHeader, noLockupHeader, footer, onHtmlChange }: { cssSource: string, items: ContentType[], siteMainHeader: string, lockupHeader: string, noLockupHeader: string, footer: string, onHtmlChange?: (html: string) => void }) {

  const [displayOption, setDisplayOption] = useState(0);
  const [lockupValue, setLockupValue] = useState("");
  const { componentId } = useParams<{ componentId: string }>();
  const location = useLocation();

  let activeItem: ContentType | undefined;
  let componentName: string | undefined;

  let contentTypeView = false;
  let headerView = false;
  let lockupHeaderView = false;
  let footerView = false;

  // check what section user selected
  if (location.pathname.includes('/components/')) {
    activeItem = items[parseInt(componentId ?? '0')];
    componentName = activeItem?.name;
    contentTypeView = true;
  }
  else if (location.pathname.includes('/main-header')) {
    activeItem = {
      name: 'header',
      html: siteMainHeader,
    };
    componentName = "Site Main Header";
    headerView = true;
  }
  else if (location.pathname.includes('/lockup-header')) {
    activeItem = {
      name: 'header',
      html: lockupValue
        ? lockupHeader.replace(/fa-alumni-association/g, lockupValue)
        : lockupHeader,
    };
    componentName = "Site Specific Header with Lockup";
    headerView = true;
    lockupHeaderView = true;
  }
  else if (location.pathname.includes('/no-lockup-header')) {
    activeItem = {
      name: 'header',
      html: noLockupHeader,
    };
    componentName = "Site Specific Header with no Lockup";
    headerView = true;
  }
  else if (location.pathname.includes('/footer')) {
    activeItem = {
      name: 'footer',
      html: footer,
    };
    componentName = "Footer";
    footerView = true;
  }

  useEffect(() => {
    if (activeItem?.html) onHtmlChange?.(activeItem.html);
  }, [activeItem?.html]);

  if (items.length === 0 && !activeItem){
    return (
        <div className="w-full h-full bg-neutral-100">
            <div className="flex items-baseline p-4 bg-white">
                <h1>Loading...</h1>
            </div>
        </div>
    );
  }

  if (!activeItem) return <div className="p-8">Component Not Found</div>;

  const head = `
    <base href="https://www.scu.edu/">
    <link rel="stylesheet" href="https://kit.fontawesome.com/895f1e62c1.css" crossorigin="anonymous" />
    <script src="https://kit.fontawesome.com/8fd101ac29.js" crossorigin="anonymous"></script>
    <link href="https://assets.scu.edu/assets/css/prism.css" rel="stylesheet" />


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
      <body>
      ${(headerView || footerView) ? `${activeItem.html}` : ''} 
      ${contentTypeView ? `<main id="content">${activeItem.html}</main>` : ''}
      </body>
      <script src="https://assets.scu.edu/public/js/weather-widget.js"></script>
      <script src="https://assets.scu.edu/public/js/animation-sunrise.js"></script>
      <script>
        $(document).ready(function () {
        if ($('.sdj') || $('.jumbotron')) {
            $('<link>')
              .appendTo('head')
              .attr({
                type: 'text/css', 
                rel: 'stylesheet',
                href: 'https://assets.scu.edu/scripts/t4/jumbotron-video.css'
              });
            $.getScript("https://assets.scu.edu/scripts/t4/jumbotron-video.js");
          }
          if ($('.accordion-item')) {
            $.getScript("https://www.scu.edu/media/scuedu/script-assets/accordion-toolkit.js");
          }
          if ($('.animation-slide-up')) {
            $.getScript("https://scu.edu/media/scuedu/script-assets/animation.js");
          }
          if ($('.code-block')) {
            $.getScript("https://assets.scu.edu/assets/js/prism.js")
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
    const selectedValue = e.target.value;
    if (selectedValue === "responsive") setDisplayOption(0);
    else if (selectedValue === "tablet") setDisplayOption(1);
    else if (selectedValue === "mobile") setDisplayOption(2);
  };

  return (
    <div className="w-full h-full bg-neutral-100">
      <div className="flex items-baseline p-4 bg-white">
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

        {lockupHeaderView && <>
          <label className="sr-only" htmlFor="lockups">Choose a Lockup:</label>
          <select
            className="gray-200 rounded-sm mx-2 h-8 border border-black max-w-[200px]"
            name="lockups"
            onChange={(e) => setLockupValue(e.target.value)} // Update your state here
            defaultValue="" // Default to standard/empty
          >
            {lockupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
        }
      </div>
      <hr />
      <iframe
        title="Component Preview"
        srcDoc={srcDoc}
        className={`${displayOption === 0 ? "w-full" : ""} 
          ${displayOption === 1 ? "w-3xl" : ""} 
          ${displayOption === 2 ? "w-106.25" : ""} 
          h-9/10 border-none bg-white mx-auto`}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default Playground;
