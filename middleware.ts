// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // プレビューページ（/blog/ybnfkckgtkknbch）へのアクセス時のみ認証を行う
  if (req.nextUrl.pathname.startsWith('/blog/ybnfkckgtkknbch')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // ユーザー名とパスワードを任意に設定（環境変数にするのがベストです）
      const ADMIN_USER = process.env.BASIC_AUTH_USER;
      const ADMIN_PASS = process.env.BASIC_AUTH_PASSWORD;

      if (user === ADMIN_USER && pwd === ADMIN_PASS) {
        return NextResponse.next();
      }
    }

    // 認証失敗時、または初回アクセス時にブラウザの認証ダイアログを表示させる
    return new NextResponse('Auth Required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

// プレビューページ以外に影響を与えないよう matcher を設定
export const config = {
  matcher: '/blog/ybnfkckgtkknbch/:path*',
};