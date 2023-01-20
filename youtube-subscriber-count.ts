#!/usr/bin/env -S PATH=${PATH}:/opt/homebrew/bin deno run --allow-env --allow-net
// Metadata allows your plugin to show up in the app, and website.
//  <xbar.title>YouTube Subscriber Count</xbar.title>
//  <xbar.version>v1.0</xbar.version>
//  <xbar.author>Jian Yuan Lee</xbar.author>
//  <xbar.author.github>jianyuan</xbar.author.github>
//  <xbar.desc>Shows your YouTube subscriber count.</xbar.desc>
//  <xbar.dependencies>deno</xbar.dependencies>
//  <xbar.abouturl>https://github.com/jianyuan/xbar-plugins</xbar.abouturl>
//  <xbar.var>string(YOUTUBE_API_KEY=""): YouTube API Key.</xbar.var>
//  <xbar.var>string(YOUTUBE_CHANNEL_ID=""): Youtube Channel ID.</xbar.var>

const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY')
const YOUTUBE_CHANNEL_ID = Deno.env.get('YOUTUBE_CHANNEL_ID')
const params = new URLSearchParams()
params.set('part', 'statistics')
params.set('key', YOUTUBE_API_KEY)
params.set('id', YOUTUBE_CHANNEL_ID)

const result = await fetch(
  `https://www.googleapis.com/youtube/v3/channels?${params}`
)
const data = await result.json()
const subs = data.items[0].statistics.subscriberCount
console.log(`${subs} Subs`)
console.log('---')
console.log(
  `Open channel dashboard | href=https://studio.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`
)
