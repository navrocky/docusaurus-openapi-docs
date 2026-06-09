/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { create } from "./utils";
import { LicenseObject } from "../openapi/types";

export function createLicense(license: LicenseObject) {
  if (!license || !Object.keys(license).length) return "";
  const { name, url, identifier } = license;

  return create("License", {
    name: name,
    url: url,
    identifier: identifier,
  });
}
