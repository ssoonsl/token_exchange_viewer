import { findKey } from "lodash";
import { CHAIN_INFO } from "./constants";

export function getChainName(chainId: number): string {
  return findKey(CHAIN_INFO, { id: chainId }) || `Chain ${chainId}`;
}
