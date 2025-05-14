const notionTokenStore = new Map<string, string>();

export function saveToken(userId: string, token: string) {
  notionTokenStore.set(userId, token);
}

export function getToken(userId: string): string | undefined {
  return notionTokenStore.get(userId);
}