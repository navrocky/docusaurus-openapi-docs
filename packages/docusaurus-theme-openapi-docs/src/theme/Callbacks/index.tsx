/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { translate } from "@docusaurus/Translate";
import Heading from "@theme/Heading";

interface Props {
  children?: React.ReactNode;
}

export default function Callbacks({ children }: Props): React.JSX.Element {
  return (
    <div>
      <div className="openapi__divider" />
      <Heading as="h2" id="callbacks" className="openapi-tabs__heading">
        {translate({
          id: "theme.openapi.callbacks.title",
          message: "Callbacks",
        })}
      </Heading>
      {children}
    </div>
  );
}
