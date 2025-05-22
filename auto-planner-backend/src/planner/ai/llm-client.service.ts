import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LLMClientService {
  async generate(prompt: string): Promise<any> {
    const HF_API_URL = 'http://localhost:8000/v1/completions'; // 🔁 로컬 LLM 주소

    const response = await axios.post(HF_API_URL, {
      model: 'openchat',
      prompt,
      max_tokens: 1024,
      temperature: 0.7,
    });

    const rawText = response.data?.[0]?.generated_text ?? response.data;
    const jsonMatch = rawText.match(/\[\s*{[\s\S]*?}\s*\]/);

    if (!jsonMatch) {
      console.error('❌ LLM 응답 JSON 파싱 실패:', rawText);
      throw new InternalServerErrorException('LLM 응답이 올바른 JSON 배열 형식이 아닙니다.');
    }

    return JSON.parse(jsonMatch[0]);
  }
}
