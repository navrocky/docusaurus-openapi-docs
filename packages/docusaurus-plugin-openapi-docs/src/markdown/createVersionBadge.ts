/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { create, guard } from "./utils";

export function createVersionBadge(version: string | undefined) {
  return guard(version, (version) => [
    create("ApiVersionBadge", { version: escape(version) }, { inline: true }),
    `\n\n`,
  ]);
}
