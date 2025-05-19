
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { SyncToNotionDto } from './dto/sync-to-notion.dto';
import { getToken } from 'src/auth/notion-token.store';

@Injectable()
export class NotionService {
  private readonly defaultDatabaseId: string;

  constructor(private readonly configService: ConfigService) {
    this.defaultDatabaseId = this.configService.get<string>('DATABASE_ID') ?? 'default-id';
  }

  private getClientForUser(userId: string): Client {
    const userToken = getToken(userId);
    if (!userToken) {
      throw new Error(`❌ Notion token not found for user ${userId}`);
    }
    return new Client({ auth: userToken });
  }

  async addPlanEntry(data: {
    userId: string;
    subject: string;
    date: string;
    content: string;
    databaseId: string;
  }) {
    const notion = this.getClientForUser(data.userId);

    return await notion.pages.create({
      parent: { database_id: data.databaseId },
      properties: {
        Subject: {
          title: [{ text: { content: data.subject } }],
        },
        'User ID': {
          rich_text: [{ text: { content: data.userId } }],
        },
        Date: {
          date: { start: data.date },
        },
        Content: {
          rich_text: [{ text: { content: data.content } }],
        },
      },
    });
  }

  async syncToNotion(dto: SyncToNotionDto) {
    for (const entry of dto.dailyPlan) {
      const [date, content] = entry.split(':').map((v) => v.trim());
      const formattedDate = `2025-${date.replace('/', '-')}`;

      await this.addPlanEntry({
        userId: dto.userId,
        subject: dto.subject,
        date: formattedDate,
        content,
        databaseId: dto.databaseId,
      });
    }

    return {
      message: '📌 노션 연동 완료',
      count: dto.dailyPlan.length,
    };
  }
}


// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config'; // ✅ 추가
// import { Client } from '@notionhq/client';
// import { SyncToNotionDto } from './dto/sync-to-notion.dto';
// import { format } from 'date-fns';
// import { getToken } from 'src/auth/notion-token.store';

// @Injectable()
// export class NotionService {
//   private notion: Client;
//   private databaseId: string;

//   constructor(private configService: ConfigService) {
//     this.notion = new Client({
//       auth: this.configService.get<string>('NOTION_TOKEN'), // ✅ .env에서 토큰 불러오기
//     });

//     this.databaseId = this.configService.get<string>('DATABASE_ID') ?? 'default-id';
//   }

//   async addPlanEntry(data: {
//     userId: string;
//     subject: string;
//     date: string;
//     content: string;
//   }) {
//     return await this.notion.pages.create({
//       parent: { database_id: this.databaseId },
//       properties: {
//         Subject: {
//           title: [{ text: { content: data.subject } }],
//         },
//         'User ID': {
//           rich_text: [{ text: { content: data.userId } }],
//         },
//         Date: {
//           date: { start: data.date },
//         },
//         Content: {
//           rich_text: [{ text: { content: data.content } }],
//         },
//       },
//     });
//   }

//   async syncToNotion(dto: SyncToNotionDto) {
//     for (const entry of dto.dailyPlan) {
//       const [date, content] = entry.split(':').map((v) => v.trim());
//       await this.addPlanEntry({
//         userId: dto.userId,
//         subject: dto.subject,
//         date: `2025-${date.replace('/', '-')}`,
//         content,
//       });
//     }

//     return { message: '노션 연동 완료', count: dto.dailyPlan.length };
//   }

//   async saveScheduleToNotion(userId: string, schedule: any[]) {
//     const calendarId = this.configService.get<string>('NOTION_CALENDAR_ID');
//     if (!calendarId) throw new Error('Notion 캘린더 ID가 설정되지 않았습니다.');

//     for (const entry of schedule) {
//       await this.notion.pages.create({
//         parent: { database_id: calendarId },
//         properties: {
//           Name: {
//             title: [
//               {
//                 text: {
//                   content: `Day ${entry.day} 학습`,
//                 },
//               },
//             ],
//           },
//           Date: {
//             date: {
//               start: entry.date,
//             },
//           },
//           Tasks: {
//             rich_text: [
//               {
//                 text: {
//                   content: entry.tasks.join(', '),
//                 },
//               },
//             ],
//           },
//           User: {
//             rich_text: [
//               {
//                 text: {
//                   content: userId,
//                 },
//               },
//             ],
//           },
//         },
//       });
//     }

//     return { message: 'Notion 일정 등록 완료' };
//   }
// }
