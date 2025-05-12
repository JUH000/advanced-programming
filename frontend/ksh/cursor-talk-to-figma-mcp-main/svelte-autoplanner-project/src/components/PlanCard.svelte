<script>
  // 카드 관련 로직 (예: 버튼 클릭 시 동작)은 여기에 추가될 수 있습니다.
</script>

<div class="plan-card">
  <div class="icon-area">
    <!-- 
      Figma 노드 6:531 (Frame)는 아이콘을 위한 공간으로 보입니다.
      실제 아이콘 SVG나 폰트 아이콘을 여기에 삽입할 수 있습니다.
      여기서는 간단한 캘린더 아이콘을 Placeholder로 사용합니다.
    -->
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  </div>
  <h2 class="card-title">학습 계획 만들기</h2>
  <p class="card-description">AI가 추천하는 맞춤형 학습 일정을 생성하세요</p>
  <button class="card-button">
    <span class="button-text">계획 생성</span>
    <!-- Figma 노드 6:552 (svg)에 해당하는 아이콘. 간단한 화살표로 대체 -->
    <span class="button-icon">→</span>
  </button>
</div>

<style>
  .plan-card {
    /* Figma "div" (6:464) 스타일 */
    background-color: #ffffff; /* fill color */
    border: 1px solid #e5e7eb; /* stroke color */
    border-radius: 12px; /* cornerRadius */
    width: 432px;
    height: 264px;
    padding: 32px; /* 내부 요소들의 x,y 좌표를 기반으로 유추한 패딩 */
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .icon-area {
    /* Figma "Frame" (6:531) 참조 - 자식 6:532의 width/height가 36x36 */
    width: 36px;
    height: 36px;
    margin-bottom: 24px; /* MyInfoCard와 동일한 간격 적용 */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-area svg {
    color: #4b5563; /* 임의의 아이콘 색상 */
  }

  .card-title {
    /* Figma "학습 계획 만들기" TEXT (6:535) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 20px;
    color: #1f2937; /* fill color */
    line-height: 1.21; /* lineHeightPx: 24.20 / fontSize: 20 */
    margin: 0;
    margin-bottom: 16px; /* MyInfoCard와 동일한 간격 적용 */
  }

  .card-description {
    /* Figma "AI가 추천하는 맞춤형 학습..." TEXT (6:537) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 16px;
    color: #4b5563; /* fill color */
    line-height: 1.21; /* lineHeightPx: 19.36 / fontSize: 16 */
    margin: 0;
    margin-bottom: 24px; /* MyInfoCard와 동일한 간격 적용 */
    flex-grow: 1; /* 버튼을 카드 하단에 위치시키기 위해 남은 공간을 채움 */
  }

  .card-button {
    /* Figma "button" FRAME (6:508) 스타일 */
    background-color: #1f2937; /* fill color */
    border: 1px solid #1f2937; /* MyInfoCard와 동일하게 stroke 제거 */
    border-radius: 8px; /* cornerRadius */
    height: 48px;
    width: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .card-button:hover {
    background-color: #374151; 
  }

  .button-text {
    /* Figma "계획 생성" TEXT (6:551) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 16px;
    color: #ffffff; /* fill color */
    line-height: 1.21; /* lineHeightPx: 19.36 / fontSize: 16 */
    margin-right: 8px; /* 아이콘과의 간격 */
  }

  .button-icon {
    /* Figma "i" FRAME (6:539) 내부 svg (6:552) 스타일 대체 */
    color: #ffffff;
    font-size: 16px; 
  }
</style>
