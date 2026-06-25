
function Accessibility() {

  return (
    <>
      <div className="container mx-auto p-16">
        <h1 className="text-4xl mb-3">
          Accessibility
        </h1>

        <p>Santa Clara University is committed to ensuring its websites are accessible to the widest possible audience.  The University is formally committed to equal access of information and following all recommended guidelines outlined in federal regulations including Sections 504 and 508 of the Rehabilitation Act of 1973 and the Americans with Disability Act of 1990 with its 2008 Amendments. More information can be found from the <a href="https://www.scu.edu/accessibility/digital-accessibility-policy/">University's Digital Accessibility Policy</a>.</p>

        <h2 className="text-2xl font-semibold mb-4">Stay in Compliance</h2>

        <p>Websites and web applications should meet WCAG accessibility standards and support the university&rsquo;s obligations under the updated ADA Title II rule.</p>

        <p className="mb-2">During development and testing, the following tools are recommended:</p>
        <ul className="list-disc list-inside space-y-1 mb-8">
          <li><strong><a href="https://wave.webaim.org/extension/">WAVE Browser Extension</a></strong> &ndash; identifies accessibility issues directly in the browser</li>
          <li><strong><a href="#/colors#accessible-combinations">SCU Brand Color Contrast Tool</a></strong> &ndash; validates accessible color combinations using SCU brand colors</li>
          <li><strong><a href="https://www.section508.gov/training/web-software/andi-training-videos/color-contrast-analyzer/">Color Contrast Analyzer and ANDI extension</a></strong> &ndash; evaluates contrast issues in web interfaces</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">For content managers</h2>

        <h3 className="text-xl font-semibold mb-2">Accessibility resources</h3>
        <ul className="list-disc list-inside space-y-1 mb-8">
          <li>Making accessible websites (coming soon)</li>
          <li><a href="https://www.scu.edu/accessibility/sa11y/">Sa11y Tool: Accessibility Checker</a></li>
          <li>Making accessible emails (coming soon)</li>
          <li>Making accessible Google docs, slides, and sheets</li>
          <li>Making accessible Word documents</li>
          <li>Accessibility tips for Canva</li>
          <li><a href="https://www.scu.edu/accessibility/#d.en.1204986">More tools to make accessible content</a></li>
          <li><a href="https://events.scu.edu/technology-training/all">Training Calendar</a></li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Let&rsquo;s do this!</h2>

        <p>Whether you're ready to get started with training, need account activation, want to explore available content types, submit a support request, or learn more about <a href="http://www.scu.edu/web-design">web design and development resources</a>, we're here to help.</p>
      </div>
    </>
  )
}

export default Accessibility
