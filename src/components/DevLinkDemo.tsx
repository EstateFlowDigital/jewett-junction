"use client";

import React from 'react';
import { DevLinkProvider } from '../../devlink/devlinkContext';
import { IntranetCard } from '../../devlink/IntranetCard';
import { IntranetTopHeading } from '../../devlink/IntranetTopHeading';
import { BtnMain } from '../../devlink/BtnMain';
import { GlobalHeading } from '../../devlink/GlobalHeading';
import { GlobalParagraph } from '../../devlink/GlobalParagraph';

/**
 * Demo component showing how to use DevLink components from Webflow.
 * All DevLink components must be wrapped in DevLinkProvider.
 */
export function DevLinkDemo() {
  return (
    <DevLinkProvider>
      <div className="space-y-8">
        {/* Intranet Top Heading - Shows page title with optional scrolling text */}
        <IntranetTopHeading
          heading="Welcome to Jewett Junction"
          subheading="Your internal company hub"
          scrollingText="Building Excellence Together | Safety First | 4EverSafe"
          scrollingTextAnimationVisibility={true}
        />

        {/* Grid of Intranet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <IntranetCard
            headingHeadingRichText="Safety First"
            paragraphParagraphRichText="Access safety newsletters, crisis management guides, and training resources."
            urlClickableLink={{ href: "/safety/modern" }}
            urlDescriptiveText="View Safety Resources"
            visualVisualImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg"
          />

          <IntranetCard
            headingHeadingRichText="HR Resources"
            paragraphParagraphRichText="Employee handbook, benefits information, payroll, and timesheets."
            urlClickableLink={{ href: "/hr/modern" }}
            urlDescriptiveText="View HR Resources"
            visualVisualImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg"
          />

          <IntranetCard
            headingHeadingRichText="IT Helpdesk"
            paragraphParagraphRichText="Submit tickets, access knowledge base, and get technical support."
            urlClickableLink={{ href: "/it-helpdesk/modern" }}
            urlDescriptiveText="Get IT Help"
            visualVisualImageFile="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/67a464bc7184fcb8aacb0ed9_placeholder.svg"
          />
        </div>

        {/* Example of BtnMain standalone */}
        <div className="flex justify-center gap-4 p-6">
          <BtnMain
            text="Share Good News"
            link={{ href: "mailto:marketing@jewettconstruction.com?subject=Good%20News" }}
            buttonStyle="primary"
            subtextVisibility={false}
            iconIconVisibility={true}
            buttonSizeIsSmall=""
          />
          <BtnMain
            text="Browse Resources"
            link={{ href: "/resources/modern" }}
            buttonStyle="secondary"
            subtextVisibility={false}
            iconIconVisibility={false}
            buttonSizeIsSmall=""
          />
        </div>
      </div>
    </DevLinkProvider>
  );
}
