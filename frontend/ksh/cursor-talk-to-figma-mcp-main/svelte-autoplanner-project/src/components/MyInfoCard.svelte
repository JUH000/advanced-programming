<script>
  // 카드 관련 로직 (예: 버튼 클릭 시 동작)은 여기에 추가될 수 있습니다.
</script>

<div class="info-card">
  <div class="icon-area">
    <!-- 
      Figma 노드 6:522 (Frame)는 아이콘을 위한 공간으로 보입니다.
      실제 아이콘 SVG나 폰트 아이콘을 여기에 삽입할 수 있습니다.
      여기서는 간단한 유저 아이콘을 Placeholder로 사용합니다.
    -->
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  </div>
  <h2 class="card-title">나의 정보 확인하기</h2>
  <p class="card-description">학습 선호도와 시험 정보를 확인하고 관리하세요</p>
  <button class="card-button">
    <span class="button-text">정보 확인</span>
    <!-- Figma 노드 6:547 (svg)에 해당하는 아이콘. 간단한 화살표로 대체 -->
    <span class="button-icon">→</span>
  </button>
</div>

<style>
  .info-card {
    /* Figma "div" (6:463) 스타일 */
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
    /* Figma "Frame" (6:522) 참조 */
    width: 36px; /* Figma 6:523 (child of 6:522) height가 36, width 31.5. 정방형으로 가정 */
    height: 36px;
    margin-bottom: 24px; /* icon-area bottom (32+36=68) to card-title top (32+36+24=92) */
    /* 아이콘 스타일링 (예: 배경색, 정렬)은 필요에 따라 추가 */
    display: flex;
    align-items: center;
    justify-content: center;
    /* 피그마에서 아이콘 프레임의 fill이 invisible 이므로, 임의의 아이콘 색상 사용 */
  }

  .icon-area svg {
    color: #4b5563; /* 임의의 아이콘 색상 */
  }

  .card-title {
    /* Figma "나의 정보 확인하기" TEXT (6:526) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 20px;
    color: #1f2937; /* fill color */
    line-height: 1.21; /* lineHeightPx: 24.20 / fontSize: 20 */
    margin: 0;
    margin-bottom: 16px; /* card-title bottom (92+28=120) to card-description top (120+16=136) */
  }

  .card-description {
    /* Figma "학습 선호도와 시험 정보를..." TEXT (6:528) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 16px;
    color: #4b5563; /* fill color */
    line-height: 1.21; /* lineHeightPx: 19.36 / fontSize: 16 */
    margin: 0;
    margin-bottom: 24px; /* card-description bottom (136+24=160) to card-button top (160+24=184) */
    flex-grow: 1; /* 버튼을 카드 하단에 위치시키기 위해 남은 공간을 채움 */
  }

  .card-button {
    /* Figma "button" FRAME (6:504) 스타일 */
    background-color: #1f2937; /* fill color */
    border: 1px solid #1f2937; /* Figma 디자인에 stroke가 없으나, 버튼 클릭 효과 등을 위해 유지 또는 fill color와 동일하게 */
    border-radius: 8px; /* cornerRadius */
    height: 48px;
    width: 100%; /* Figma width: 368.26인데, 카드 내부 패딩 고려하여 100%로 설정 */
    padding: 0; /* 내부 span으로 핸들링 */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .card-button:hover {
    background-color: #374151; /* 어두운 회색으로 변경 (예시) */
  }

  .button-text {
    /* Figma "정보 확인" TEXT (6:546) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 16px;
    color: #ffffff; /* fill color */
    line-height: 1.21; /* lineHeightPx: 19.36 / fontSize: 16 */
    margin-right: 8px; /* 아이콘과의 간격 */
  }

  .button-icon {
    /* Figma "i" FRAME (6:530) 내부 svg (6:547) 스타일 대체 */
    color: #ffffff;
    font-size: 16px; /* 텍스트와 유사한 크기 */
  }
</style> 