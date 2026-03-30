import { NavLink } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { ArrowRight } from 'lucide-react'

function Welcome() {
  return (
    <>
        <div className="container mx-auto p-16" id="content">
            <h1 className="text-4xl mb-3">
                Welcome to Santa Clara University's Design System
            </h1>
            <div className="flex flex-col">
            <a href="https://www.scu.edu/umc/brand/" className="inline-flex items-center">
                UMC Visual Identity Guidelines&nbsp;<ExternalLink size={14} />
            </a>
            <a className="inline-flex items-center">
                Github repository&nbsp;<ExternalLink size={14} />
            </a>
            <NavLink to="/components/0" className="inline-flex items-center">
                Content Types&nbsp;<ArrowRight size={14} />
            </NavLink>
            <NavLink to="/main-header" className="inline-flex items-center">
                Headers and Footer&nbsp;<ArrowRight size={14} />
            </NavLink>
            </div>
        </div>
    </>
  );
}

export default Welcome
