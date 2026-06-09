/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { translate } from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import Markdown from "@theme/Markdown";
import SchemaTabs from "@theme/SchemaTabs";
import TabItem from "@theme/TabItem";

interface OAuthFlow {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes?: Record<string, string>;
}

interface SecurityScheme {
  type: string;
  description?: string;
  name?: string;
  in?: string;
  scheme?: string;
  bearerFormat?: string;
  openIdConnectUrl?: string;
  flows?: Record<string, OAuthFlow>;
}

interface Props {
  securitySchemes?: Record<string, SecurityScheme>;
}

// All labels are static `translate()` calls (literal id + message) so that
// `docusaurus write-translations` can extract them — see theme/translationIds.ts
// for why ids must be inlined string literals.
const labels = {
  securitySchemeType: () =>
    translate({
      id: "theme.openapi.authentication.securitySchemeType",
      message: "Security Scheme Type:",
    }),
  httpAuthScheme: () =>
    translate({
      id: "theme.openapi.authentication.httpAuthScheme",
      message: "HTTP Authorization Scheme:",
    }),
  bearerFormat: () =>
    translate({
      id: "theme.openapi.authentication.bearerFormat",
      message: "Bearer format:",
    }),
  openIdConnectUrl: () =>
    translate({
      id: "theme.openapi.authentication.openIdConnectUrl",
      message: "OpenID Connect URL:",
    }),
  scopes: () =>
    translate({
      id: "theme.openapi.authentication.scopes",
      message: "Scopes:",
    }),
  tokenUrl: () =>
    translate({
      id: "theme.openapi.authentication.tokenUrl",
      message: "Token URL:",
    }),
  authorizationUrl: () =>
    translate({
      id: "theme.openapi.authentication.authorizationUrl",
      message: "Authorization URL:",
    }),
  refreshUrl: () =>
    translate({
      id: "theme.openapi.authentication.refreshUrl",
      message: "Refresh URL:",
    }),
  oauthFlow: (flow: string) =>
    translate(
      {
        id: "theme.openapi.authentication.oauthFlow",
        message: "OAuth Flow ({flow}):",
      },
      { flow }
    ),
  parameterName: (location: string) =>
    translate(
      {
        id: "theme.openapi.authentication.parameterName",
        message: "{location} parameter name:",
      },
      { location }
    ),
};

function SecuritySchemeTypeRow({ type }: { type: string }) {
  return (
    <tr>
      <th>{labels.securitySchemeType()}</th>
      <td>{type}</td>
    </tr>
  );
}

function AuthenticationTable({ scheme }: { scheme: SecurityScheme }) {
  const { bearerFormat, flows, name, scheme: httpScheme, type } = scheme;

  switch (type) {
    case "apiKey": {
      const location = scheme.in
        ? scheme.in.charAt(0).toUpperCase() + scheme.in.slice(1)
        : "";
      return (
        <div>
          <table>
            <tbody>
              <SecuritySchemeTypeRow type={type} />
              <tr>
                <th>{labels.parameterName(location)}</th>
                <td>{name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    case "http":
      return (
        <div>
          <table>
            <tbody>
              <SecuritySchemeTypeRow type={type} />
              <tr>
                <th>{labels.httpAuthScheme()}</th>
                <td>{httpScheme}</td>
              </tr>
              {bearerFormat && (
                <tr>
                  <th>{labels.bearerFormat()}</th>
                  <td>{bearerFormat}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    case "oauth2":
      return (
        <div>
          <table>
            <tbody>
              <SecuritySchemeTypeRow type={type} />
              {Object.entries(flows ?? {}).map(([flowType, flow]) => (
                <tr key={flowType}>
                  <th>{labels.oauthFlow(flowType)}</th>
                  <td>
                    {flow.tokenUrl && (
                      <div>
                        {labels.tokenUrl()} {flow.tokenUrl}
                      </div>
                    )}
                    {flow.authorizationUrl && (
                      <div>
                        {labels.authorizationUrl()} {flow.authorizationUrl}
                      </div>
                    )}
                    {flow.refreshUrl && (
                      <div>
                        {labels.refreshUrl()} {flow.refreshUrl}
                      </div>
                    )}
                    <span>{labels.scopes()}</span>
                    <ul>
                      {Object.entries(flow.scopes ?? {}).map(
                        ([scope, description]) => (
                          <li key={scope}>
                            {scope}: {description}
                          </li>
                        )
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "openIdConnect":
      return (
        <div>
          <table>
            <tbody>
              <SecuritySchemeTypeRow type={type} />
              {scheme.openIdConnectUrl && (
                <tr>
                  <th>{labels.openIdConnectUrl()}</th>
                  <td>{scheme.openIdConnectUrl}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

function formatTabLabel(key: string, scheme: SecurityScheme): string {
  const { type, scheme: httpScheme } = scheme;
  if (type === "oauth2") {
    return translate(
      {
        id: "theme.openapi.authentication.tab.oauth2",
        message: "OAuth 2.0: {key}",
      },
      { key }
    );
  }
  if (type === "apiKey") {
    return translate(
      {
        id: "theme.openapi.authentication.tab.apiKey",
        message: "API Key: {key}",
      },
      { key }
    );
  }
  if (type === "http" && httpScheme === "basic") {
    return translate({
      id: "theme.openapi.authentication.tab.httpBasic",
      message: "HTTP: Basic Auth",
    });
  }
  if (type === "http" && httpScheme === "bearer") {
    return translate({
      id: "theme.openapi.authentication.tab.httpBearer",
      message: "HTTP: Bearer Auth",
    });
  }
  if (type === "openIdConnect") {
    return translate(
      {
        id: "theme.openapi.authentication.tab.openIdConnect",
        message: "OpenID Connect: {key}",
      },
      { key }
    );
  }
  // Non-special schemes: derive a human-readable label from the scheme key.
  return key
    .replace(/(_|-)/g, " ")
    .trim()
    .replace(/\w\S*/g, (str) => str.charAt(0).toUpperCase() + str.substr(1))
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
}

export default function Authentication({
  securitySchemes,
}: Props): React.JSX.Element | null {
  if (!securitySchemes || !Object.keys(securitySchemes).length) {
    return null;
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Heading as="h2" id="authentication" className="openapi-tabs__heading">
        {translate({
          id: "theme.openapi.authentication.title",
          message: "Authentication",
        })}
      </Heading>
      <SchemaTabs className="openapi-tabs__security-schemes">
        {Object.entries(securitySchemes).map(([schemeKey, scheme]) => (
          // @ts-ignore
          <TabItem
            key={schemeKey}
            label={formatTabLabel(schemeKey, scheme)}
            value={schemeKey}
          >
            {scheme.description && <Markdown>{scheme.description}</Markdown>}
            <AuthenticationTable scheme={scheme} />
          </TabItem>
        ))}
      </SchemaTabs>
    </div>
  );
}
