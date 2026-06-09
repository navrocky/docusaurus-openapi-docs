/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { translate } from "@docusaurus/Translate";

interface Props {
  name?: string;
  url?: string;
  identifier?: string;
}

export default function License({
  name,
  url,
  identifier,
}: Props): React.JSX.Element | null {
  if (!name && !url && !identifier) {
    return null;
  }

  return (
    <div style={{ marginBottom: "var(--ifm-paragraph-margin-bottom)" }}>
      <h3 style={{ marginBottom: "0.25rem" }}>
        {translate({ id: "theme.openapi.license.title", message: "License" })}
      </h3>
      {url && <a href={url}>{name ?? url}</a>}
      {identifier && (
        <a href={`https://spdx.org/licenses/${identifier}.html`}>
          {name ?? identifier}
        </a>
      )}
    </div>
  );
}
