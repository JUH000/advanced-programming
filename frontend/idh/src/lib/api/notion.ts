// src/lib/api/notion.ts

/**
 * JWT 토큰에서 payload 디코딩
 */
export function decodeJwtPayload(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

/**
 * Notion 인증 URL을 받아 리다이렉트
 */
export async function requestNotionRedirect() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('로그인이 필요합니다.');

  const payload = decodeJwtPayload(token);
  const userId = payload.userId;
  if (!userId) throw new Error('userId가 JWT에 없습니다.');

  const res = await fetch(`https://advanced-programming.onrender.com/auth/notion/redirect?userId=${userId}`);
  if (!res.ok) throw new Error('Notion 리디렉션 URL 요청 실패');

  const notionAuthUrl = await res.text();
  window.location.href = notionAuthUrl;
}
