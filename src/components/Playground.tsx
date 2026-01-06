import { useParams } from 'react-router-dom';

interface ContentType {
  id: string;
  html: string;
}

function Playground({ cssSource, items }: { cssSource: string, items: ContentType[] }) {
  const { componentId } = useParams<{ componentId: string }>();
  const activeItem = items.find((item) => item.id === "content-type-" + componentId);

  if (items.length === 0) <div className="p-8">Loading...</div>;
  if (!activeItem) return <div className="p-8">Component "{componentId}" not found.</div>;

  const head = `
    <base href="https://www.scu.edu/">
    <link rel="stylesheet" href="https://kit.fontawesome.com/895f1e62c1.css" crossorigin="anonymous" />
    <script src="https://kit.fontawesome.com/8fd101ac29.js" crossorigin="anonymous"></script>


    <!-- toolkit styles -->
    <link rel="stylesheet" href="${cssSource}" media="screen" />
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

  return (
    <div className="w-full h-full">
      <iframe
        title="Component Preview"
        srcDoc={srcDoc}
        className="w-full h-full border-none"
        sandbox="allow-scripts"
      />
    </div>
  );


}

export default Playground;
