// SPDX-License-Identifier: MIT

import type { ClawdbotConfig } from 'openclaw/plugin-sdk';
import { createAccountScopedConfig } from '../../core/accounts';
import { LarkClient } from '../../core/lark-client';

/**
 * Resolve Feishu markdown table mode against the merged account config.
 */
export function resolveFeishuMarkdownTableMode(cfg: ClawdbotConfig, accountId?: string) {
  const resolver = LarkClient.runtime?.channel?.text?.resolveMarkdownTableMode;
  if (!resolver) {
    return 'off';
  }

  const accountScopedCfg = createAccountScopedConfig(cfg, accountId);
  return resolver({
    cfg: accountScopedCfg,
    channel: 'feishu',
  });
}

/**
 * Convert markdown tables using the configured Feishu table mode when the
 * runtime converter is available.
 */
export function convertMarkdownTablesForFeishu(cfg: ClawdbotConfig, text: string, accountId?: string): string {
  const converter = LarkClient.runtime?.channel?.text?.convertMarkdownTables;
  if (!converter) {
    return text;
  }

  return converter(text, resolveFeishuMarkdownTableMode(cfg, accountId));
}
