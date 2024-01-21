export const tsUnix = (): number => Math.round(tsUnixMs() / 1000)

export const tsUnixMs = (): number => Math.round(new Date().getTime())
