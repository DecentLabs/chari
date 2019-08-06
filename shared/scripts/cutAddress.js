export default function (address) {
  if (address) {
    const n = 4
    const cutAt = address.length - n
    const addressEnd = address.substring(cutAt)
    const addressStart = address.slice(0, n)
    return {
      start: addressStart,
      end: addressEnd
    }
  }
}
