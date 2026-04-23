import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Playground from "./components/Playground";
import CodePanel from "./components/CodePanel";

import { Panel, Group, Separator } from "react-resizable-panels";

import { Routes, Route, useLocation } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Style from "./pages/Style";
import Colors from "./pages/Colors";
import Favicon from "./pages/Favicon";
import Typography from "./pages/Typography";

import Logos from "./pages/Logos";

interface ContentType {
  name: string;
  html: string;
}

interface PlaygroundRouteProps {
  items: ContentType[];
  siteMainHeader: string;
  lockupHeader: string;
  noLockupHeader: string;
  footer: string;
  siteHead: string;
  afterFooter: string;
}

function PlaygroundRoute(props: PlaygroundRouteProps) {
  const [activeHtml, setActiveHtml] = useState("");
  return (
    <Group className="h-full" orientation="vertical">
      <Panel>
        <Playground {...props} onHtmlChange={setActiveHtml} />
      </Panel>
      <Separator className="h-2 bg-gray-200 hover:bg-gray-500" />
      <Panel defaultSize={250}>
        <CodePanel html={activeHtml} />
      </Panel>
    </Group>
  );
}

function App() {
  const location = useLocation();
  const needsData = location.pathname.startsWith('/components/') ||
    ['/main-header', '/lockup-header', '/no-lockup-header', '/footer'].includes(location.pathname);

  const [contentTypeData, setContentTypeData] = useState<ContentType[]>([]);

  const [siteMainHeader, setSiteMainHeader] = useState("");
  const [lockupHeader, setLockupHeader] = useState("");
  const [noLockupHeader, setNoLockupHeader] = useState("");
  const [siteFooter, setSiteFooter] = useState("");
  const [siteHead, setSiteHead] = useState("");
  const [afterFooter, setAfterFooter] = useState("");

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      try {
        const base = import.meta.env.DEV
          ? "/external-content"
          : "https://www.scu.edu";

        const [contentTypesRes, lockupRes, noLockupRes] = await Promise.all([
          fetch(`${base}/site-assets/content-types/`),
          fetch(`${base}/site-assets/site-specific-lockup/`),
          fetch(`${base}/site-assets/site-specific-no-lockup/`),
        ]);

        const parser = new DOMParser();

        // Content types
        const contentTypesHtml = await contentTypesRes.text();
        const contentTypesDoc = parser.parseFromString(
          contentTypesHtml,
          "text/html",
        );
        const contentTypeElements = contentTypesDoc.querySelectorAll('.content-type');
        const formatted = Array.from(contentTypeElements).map((el) => ({
          name: (el as HTMLElement).dataset.name ?? '',
          html: el.outerHTML,
        }));
        setContentTypeData(formatted);

        setSiteHead(contentTypesDoc.head.innerHTML);

        const lastFooterEnd = contentTypesHtml.lastIndexOf('</footer>');
        const bodyEnd = contentTypesHtml.lastIndexOf('</body>');
        if (lastFooterEnd !== -1 && bodyEnd !== -1) {
          setAfterFooter(contentTypesHtml.slice(lastFooterEnd + '</footer>'.length, bodyEnd).trim());
        }

        // Site main header (from content-types page)
        const mainHeader = contentTypesDoc.querySelector("header");
        if (mainHeader) setSiteMainHeader(mainHeader.outerHTML);

        // Site footer (from content-types page)
        // Gets last footer on the page
        const footers = contentTypesDoc.querySelectorAll("footer");
        const footer = footers.length > 0 ? footers[footers.length - 1] : null;
        if (footer) setSiteFooter(footer.outerHTML);

        // Lockup header
        const lockupHtml = await lockupRes.text();
        const lockupDoc = parser.parseFromString(lockupHtml, "text/html");
        const lockupHeaderEl = lockupDoc.querySelector("header");
        if (lockupHeaderEl) setLockupHeader(lockupHeaderEl.outerHTML);

        // No-lockup header
        const noLockupHtml = await noLockupRes.text();
        const noLockupDoc = parser.parseFromString(noLockupHtml, "text/html");
        const noLockupHeaderEl = noLockupDoc.querySelector("header");
        if (noLockupHeaderEl) setNoLockupHeader(noLockupHeaderEl.outerHTML);
      } catch (error) {
        console.error("Failed to fetch: ", error);
      } finally {
        setLoaded(true);
      }
    };

    fetchData();
  }, []);

  if (!loaded && needsData) {
    return (
      <Group className="flex h-screen w-screen overflow-hidden bg-white">
        {/* LEFT COLUMN CONTAINER: navbar */}
        <Panel defaultSize={300} className="border-r border-gray-200">
          <Navbar items={contentTypeData} loading={!loaded} />
        </Panel>

        <Separator className="w-2 bg-gray-200 hover:bg-gray-500" />

        {/* RIGHT COLUMN CONTAINER: playground + code */}
        <Panel className="flex-1 flex flex-col h-full min-w-0">
          <div className="container mx-auto p-16">
            <h1>Loading</h1>
          </div>
        </Panel>
      </Group>
    );
  }

  return (
    <>
      <Group className="flex h-screen w-screen overflow-hidden bg-white">
        {/* LEFT COLUMN CONTAINER: navbar */}
        <Panel defaultSize={300} className="border-r border-gray-200">
          <Navbar items={contentTypeData} loading={!loaded} />
        </Panel>

        <Separator className="w-2 bg-gray-200 hover:bg-gray-500" />

        {/* RIGHT COLUMN CONTAINER: playground + code */}
        <Panel className="flex-1 flex flex-col h-full min-w-0">
          <Routes>
            {["/components/:componentId", "/main-header", "/lockup-header", "/no-lockup-header", "/footer"].map(
              (path) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PlaygroundRoute
                      items={contentTypeData}
                      siteMainHeader={siteMainHeader}
                      lockupHeader={lockupHeader}
                      noLockupHeader={noLockupHeader}
                      footer={siteFooter}
                      siteHead={siteHead}
                      afterFooter={afterFooter}
                    />
                  }
                />
              )
            )}

            <Route path="/" element={<Welcome />} />
            <Route path="/style" element={<Style />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/favicon" element={<Favicon />} />
            <Route path="/typography" element={<Typography />} />
            <Route path="/logos" element={<Logos />} />
          </Routes>
        </Panel>
      </Group>
    </>
  );
}

export default App;
