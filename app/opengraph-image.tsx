import { ImageResponse } from 'next/og'
import { site } from '@/lib/metadata'

export const runtime = 'edge'
export const alt = site.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
          backgroundColor: '#0f0f0f',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: '#eefe53', display: 'flex' }} />
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, display: 'flex' }}>
            DRAGLINE DEVELOPERS
          </div>
        </div>
        <div style={{ marginTop: 56, fontSize: 58, fontWeight: 700, lineHeight: 1.15, maxWidth: 920, display: 'flex' }}>
          {site.tagline}
        </div>
        <div style={{ marginTop: 28, fontSize: 26, color: '#b5b5b0', maxWidth: 820, display: 'flex' }}>
          {site.description}
        </div>
      </div>
    ),
    { ...size }
  )
}
