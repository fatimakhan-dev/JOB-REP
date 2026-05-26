/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function LucideIcon({ name, className = '', size = 20 }: LucideIconProps) {
  // Safe-lookup helper mapping key icon names to components
  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name];
  
  if (!IconComponent) {
    // Fallback to HelpCircle if an icon isn't found
    return <Icons.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
