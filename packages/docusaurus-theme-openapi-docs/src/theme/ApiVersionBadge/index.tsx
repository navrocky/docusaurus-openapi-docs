/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { translate } from "@docusaurus/Translate";

interface Props {
  version?: string;
}

export default function ApiVersionBadge({
  version,
}: Props): React.JSX.Element | null {
  if (!version) {
    return null;
  }

  return (
    <span className="theme-doc-version-badge badge badge--secondary">
      {translate({
        id: "theme.openapi.versionBadge.label",
        message: "Version:",
      })}{" "}
      {version}
    </span>
  );
}
