<script>
  // 스크립트 로직은 현재 필요하지 않습니다.
</script>

<div class="welcome-container">
  <h1 class="welcome-title">AutoPlanner에 오신 것을 환영합니다</h1>
  <p class="welcome-subtitle">AI 기반 맞춤형 학습 계획으로 효율적인 시험 준비를 시작하세요</p>
</div>

<style>
  .welcome-container {
    /* Figma "div" (6:444) 스타일 - 환영 메시지 섹션 */
    /* width: 896px; height: 76px; 이미 부모인 .content-column 에서 너비가 관리됨 */
    display: flex;
    flex-direction: column;
    align-items: center; /* 텍스트 중앙 정렬 */
    gap: 18px; /* 제목과 부제목 사이의 간격 (Figma y좌표 차이 및 높이 기반 계산) */
                /* 타이틀(6:460) y:-970, height:36 -> bottom: -934. 서브타이틀(6:462) y:-916.  -916 - (-934) = 18px */
    box-sizing: border-box;
  }

  .welcome-title {
    /* Figma "AutoPlanner에 오신 것을 환영합니다" TEXT (6:460) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 30px;
    color: #1f2937; /* fill color */
    text-align: center; /* textAlignHorizontal: CENTER */
    line-height: 1.2; /* Figma lineHeightPx: 30 (font-size: 30)이지만, 시각적 균형을 위해 약간 늘림 */
    margin: 0; /* 기본 h1 마진 제거 */
  }

  .welcome-subtitle {
    /* Figma "AI 기반 맞춤형 학습 계획으로..." TEXT (6:462) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 16px;
    color: #4b5563; /* fill color */
    text-align: center; /* textAlignHorizontal: CENTER */
    line-height: 1.25; /* Figma lineHeightPx: 16 (font-size: 16)이지만, 시각적 균형을 위해 약간 늘림 */
    margin: 0; /* 기본 p 마진 제거 */
  }
</style> 