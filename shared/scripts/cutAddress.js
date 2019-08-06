export default function (address) {
  if (address) {
    const addressEnd = address.substring(address.length - 4)
    const addressStart = address.slice(0, 6)
    return {
      start: addressStart,
      end: addressEnd
    }
  }
}
