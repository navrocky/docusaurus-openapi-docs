/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { create } from "./utils";
import { ContactObject } from "../openapi/types";

export function createContactInfo(contact: ContactObject) {
  if (!contact || !Object.keys(contact).length) return "";
  const { name, url, email } = contact;

  return create("Contact", {
    name: name,
    url: url,
    email: email,
  });
}
