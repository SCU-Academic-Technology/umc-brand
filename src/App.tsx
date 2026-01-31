import { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import Playground from './components/Playground'
import CodePanel from './components/CodePanel'

import { Panel, Group, Separator } from 'react-resizable-panels';

import { Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Style from './pages/Style';
import Colors from './pages/Colors';
import Favicon from './pages/Favicon';
import Typography from './pages/Typography';


import Logos from './pages/Logos';

interface ContentType {
  id: string;
  html: string;
}

function App() {
  const [contentTypeData, setContentTypeData] = useState<ContentType[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      try {
        const response = await fetch("/external-content/site-assets/content-types/")
        const data = await response.text();
        console.log(data);

        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const contentTypeElements = doc.querySelectorAll('[id^="content-type-"]');

        const formatted = Array.from(contentTypeElements).map((el) => ({
          id: el.id,
          html: el.outerHTML
        }));

        setContentTypeData(formatted);

        console.log(contentTypeElements);



      } catch (error) {
        console.error("Failed to fetch: ", error)
      } finally {
        setLoaded(true);
      }
    }

    fetchData();

  }, []);

  if (!loaded) {
    return (
      <Group className="flex h-screen w-screen overflow-hidden bg-white">
        {/* LEFT COLUMN CONTAINER: navbar */}
        <Panel defaultSize={300} className="border-r border-gray-200">
          <Navbar
          />
        </Panel>

        <Separator className="w-2 bg-gray-200 hover:bg-gray-500" />

        {/* RIGHT COLUMN CONTAINER: playground + code */}
        <Panel className="flex-1 flex flex-col h-full min-w-0">
          <div className="container mx-auto p-16">
            <h1>Loading</h1>
          </div>
        </Panel>
      </Group >
    )
  }

  return (

    <Group className="flex h-screen w-screen overflow-hidden bg-white">
      {/* LEFT COLUMN CONTAINER: navbar */}
      <Panel defaultSize={300} className="border-r border-gray-200">
        <Navbar
        />
      </Panel>

      <Separator className="w-2 bg-gray-200 hover:bg-gray-500" />

      {/* RIGHT COLUMN CONTAINER: playground + code */}
      <Panel className="flex-1 flex flex-col h-full min-w-0">
        <Routes>
          <Route path="/components/:componentId" element={
            <Group className="h-full" orientation='vertical'>
              <Panel>
                <Playground cssSource="https://assets.scu.edu/public/scu.2.3.css" items={contentTypeData} />
              </Panel>
              <Separator className="h-2 bg-gray-200 hover:bg-gray-500" />
              <Panel defaultSize={250}>
                <CodePanel items={contentTypeData} />
              </Panel>
            </Group>
          } />

          <Route path="/" element={<Welcome />} />
          <Route path="/style" element={<Style />} />
          <Route path="/colors" element={<Colors />} />
          <Route path="/favicon" element={<Favicon />} />
          <Route path="/typography" element={<Typography />} />


          <Route path="/logos" element={<Logos />} />
        </Routes>
      </Panel>
    </Group >
  )
}

export default App
