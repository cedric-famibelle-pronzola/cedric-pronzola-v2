import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const { searchParams } = url;

    // Get direct params with default fallbacks
    const title = searchParams.get('title') || 'Cédric Famibelle-Pronzola';

    // Check for both normal and HTML-encoded parameter names
    let subtitle = searchParams.get('subtitle');
    if (!subtitle) {
      // Try HTML-encoded variant that might appear in URLs
      subtitle = searchParams.get('amp;subtitle');
    }

    // Use default if neither parameter was found
    if (!subtitle) {
      subtitle = 'Concepteur et Développeur Web/Mobile | Libriste';
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '40px',
              width: '100%',
              maxWidth: '1000px',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                display: 'flex',
                marginBottom: '30px',
              }}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://cedric-pronzola.dev'}/cedric-avatar.png`}
                width="120"
                height="120"
                style={{
                  borderRadius: '50%',
                }}
                alt="Cédric Famibelle-Pronzola"
              />
            </div>

            <h1 style={{ fontSize: '60px', margin: '0', textAlign: 'center' }}>{title}</h1>
            <h2 style={{
              fontSize: '32px',
              color: '#444',
              margin: '20px 0',
              textAlign: 'center',
              backgroundColor: 'rgba(240, 240, 240, 0.7)',
              padding: '15px 20px',
              borderRadius: '10px',
              maxWidth: '90%',
            }}>{subtitle}</h2>
            <p style={{ fontSize: '24px', color: '#666', marginTop: '15px' }}>cedric-pronzola.dev</p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('OG Image Error:', e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
