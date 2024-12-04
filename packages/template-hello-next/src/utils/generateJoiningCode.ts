export default function generateJoiningCode() {
    // 128 bits of entropy
    return [
        Math.random().toString(36).substring(2, 12),
        Math.random().toString(36).substring(2, 12),
        Math.random().toString(36).substring(2, 7)
    ].join("")
}
