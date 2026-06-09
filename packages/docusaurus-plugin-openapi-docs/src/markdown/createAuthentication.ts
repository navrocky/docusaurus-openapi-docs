/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { create } from "./utils";
import { SecuritySchemeObject } from "../openapi/types";

/**
 * Renders the "Authentication" section by emitting the `@theme/Authentication`
 * runtime component with the security schemes as a prop. The labels are
 * localized inside that component via `translate()`, so they are extractable by
 * `write-translations` and translated at runtime (rather than being baked into
 * the generated MDX as English text).
 */
export function createAuthentication(securitySchemes: SecuritySchemeObject) {
  if (!securitySchemes || !Object.keys(securitySchemes).length) {
    return "";
  }

  return create("Authentication", {
    securitySchemes: securitySchemes,
  });
}
