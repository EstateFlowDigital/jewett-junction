"use client";

import React from 'react';
import { DevLinkProvider } from '../../devlink/devlinkContext';

interface DevLinkWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that provides DevLink context to children.
 * Use this to wrap any DevLink components from Webflow.
 *
 * Example usage:
 * ```tsx
 * <DevLinkWrapper>
 *   <IntranetCard
 *     headingHeadingRichText="Safety First"
 *     paragraphParagraphRichText="Access safety resources"
 *   />
 * </DevLinkWrapper>
 * ```
 */
export function DevLinkWrapper({ children }: DevLinkWrapperProps) {
  return (
    <DevLinkProvider>
      {children}
    </DevLinkProvider>
  );
}
