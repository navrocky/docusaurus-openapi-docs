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
  email?: string;
}

export default function Contact({
  name,
  url,
  email,
}: Props): React.JSX.Element | null {
  if (!name && !url && !email) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "var(--ifm-paragraph-margin-bottom)",
      }}
    >
      <h3 style={{ marginBottom: "0.25rem" }}>
        {translate({ id: "theme.openapi.contact.title", message: "Contact" })}
      </h3>
      <span>
        {name ? `${name}: ` : null}
        {email && <a href={`mailto:${email}`}>{email}</a>}
      </span>
      {url && (
        <span>
          {translate({ id: "theme.openapi.contact.url", message: "URL:" })}{" "}
          <a href={url}>{url}</a>
        </span>
      )}
    </div>
  );
}
