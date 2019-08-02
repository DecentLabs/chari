export default function (address) {
  if (address) {
    const cutAt = address.length - 5
    const addressEnd = address.substring(cutAt)
    const addressStart = address.slice(0, cutAt)
    return {
      start: addressStart,
      end: addressEnd
    }
  }
}
