export function formatAddress(address: string): string {
  return address.slice(0, 12) + "..." + address.slice(-7);
}
