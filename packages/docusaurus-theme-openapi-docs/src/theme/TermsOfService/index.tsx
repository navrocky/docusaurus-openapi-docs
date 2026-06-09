/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { translate } from "@docusaurus/Translate";

interface Props {
  url?: string;
}

export default function TermsOfService({
  url,
}: Props): React.JSX.Element | null {
  if (!url) {
    return null;
  }

  return (
    <div style={{ marginBottom: "var(--ifm-paragraph-margin-bottom)" }}>
      <h3 style={{ marginBottom: "0.25rem" }}>
        {translate({
          id: "theme.openapi.termsOfService.title",
          message: "Terms of Service",
        })}
      </h3>
      <a href={url}>{url}</a>
    </div>
  );
}
