export function getCurrentDevice(ua: string): string {
  return /mobile/i.test(ua) ? 'mobile' : 'desktop'
}

export function isBot(ua: string): string {
  return /curl|bot|googlebot|google|baidu|bing|msn|duckduckgo|teoma|slurp|crawler|spider|robot|crawling/i.test(
    ua
  )
}

export function isDesktop(ua: string): string {
  return !/mobile/i.test(ua)
}

export function isMobile(ua: string): string {
  return /mobile/i.test(ua)
}
