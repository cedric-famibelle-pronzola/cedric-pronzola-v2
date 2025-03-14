import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get title from query params
    const title = searchParams.get('title') || 'Cédric Famibelle-Pronzola';
    const subtitle = searchParams.get('subtitle') || 'Développeur Web - Libriste';
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            backgroundImage: 'linear-gradient(to bottom right, #f0f0f0, #ffffff)',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://cedric-pronzola.re'}/cedric-avatar.png`}
              width="120"
              height="120"
              style={{
                borderRadius: '50%',
              }}
              alt="Cédric Famibelle-Pronzola"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 'bold',
                color: '#000',
                margin: '0',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            <h2
              style={{
                fontSize: '30px',
                color: '#666',
                margin: '10px 0 0 0',
              }}
            >
              {subtitle}
            </h2>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                color: '#666',
              }}
            >
              cedric-pronzola.re
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 