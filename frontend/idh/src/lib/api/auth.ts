const BASE_URL = 'http://localhost:3000'; // 백엔드 서버 주소

// 회원가입 요청 함수
export async function signup(userData: {
  username: string;
  password: string;
  email?: string;
}) {
  const res = await fetch(`${BASE_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || '회원가입 실패');
  return data;
}

// 로그인 요청 함수
export async function login(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || '로그인 실패');
  
  // 로그인 성공 시 JWT 토큰을 localStorage에 저장
  localStorage.setItem('token', data.accessToken);
  return data;
}
