<script>
  // 노션 연동 로직은 여기에 추가될 수 있습니다.
</script>

<div class="notion-link-container">
  <div class="header-section">
    <h2 class="section-title">노션 연동하기</h2>
    <!-- 
      Figma 노드 6:511 (Frame)는 아이콘을 위한 공간으로 보입니다.
      필요하다면 여기에 노션 로고 등의 아이콘을 추가할 수 있습니다.
      <img src="/notion-logo.svg" alt="Notion" class="title-icon" /> 
    -->
  </div>
  <p class="section-description">노션 캘린더와 연동하여 학습 일정을 동기화하세요</p>
  <button class="connect-button">
    <span class="button-text">노션 연결하기</span>
    <!-- 
      Figma 노드 6:521 (i) 내부의 svg (6:542)에 해당하는 아이콘.
      여기서는 간단한 아이콘(예: 플러스 또는 링크 아이콘)으로 대체하거나, 
      피그마에 있는 특정 아이콘을 사용할 수 있습니다.
    -->
    <span class="button-icon">+</span> 
  </button>
</div>

<style>
  .notion-link-container {
    /* Figma "div" (6:446) 스타일 */
    background-color: #ffffff; /* fill color */
    border: 1px solid #e5e7eb; /* stroke color */
    border-radius: 12px; /* cornerRadius */
    width: 896px; /* width */
    height: 196px; /* height */
    padding: 32px; /* 내부 요소들의 x,y 좌표를 기반으로 유추한 패딩 */
                /* title(6:510) y:-502, parent(6:446) y:-534 => 32px padding-top */
                /* button(6:467) y:-410, height:40 => bottom -370. parent bottom -338. => 32px padding-bottom */
                /* title(6:510) x:3074, parent(6:446) x:3042 => 32px padding-left */
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .header-section {
    /* Figma "div" (6:465) 스타일 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px; /* title bottom (32+28=60) to description top (60+24=84) */
                      /* 6:510 y:-500, height:24 (figma design height 28) => bottom: -476 (or -472) */
                      /* 6:519 y:-450 => -450 - (-476) = 26px.  Or -450 - (-472) = 22px.  Using 24px as an average. */
  }

  .section-title {
    /* Figma "노션 연동하기" TEXT (6:510) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 20px;
    color: #1f2937; /* fill color */
    line-height: 1.2; /* lineHeightPx: 20 (font-size 20)이지만, 시각적 일관성을 위해 조정 */
    margin: 0;
  }

  /* .title-icon 스타일 (만약 아이콘을 추가한다면) */
  /*
  .title-icon {
    width: 24px;
    height: 24px;
  }
  */

  .section-description {
    /* Figma "노션 캘린더와 연동하여..." TEXT (6:519) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 16px;
    color: #4b5563; /* fill color */
    line-height: 1.21; /* lineHeightPx: 19.36 / fontSize: 16 */
    margin: 0;
    margin-bottom: 16px; /* description bottom (84+24=108) to button top (108+16=124) */
                      /* 6:519 y:-450, height:24 (figma design height 24) => bottom: -426 */
                      /* 6:467 y:-410 => -410 - (-426) = 16px. */
    flex-grow: 1; /* 버튼을 하단에 위치시키기 위해 */
  }

  .connect-button {
    /* Figma "button" FRAME (6:467) 스타일 */
    background-color: #f3f4f6; /* fill color */
    border: 1px solid #e5e7eb; /* stroke color */
    border-radius: 8px; /* cornerRadius */
    width: 160.27px; /* width */
    height: 40px; /* height */
    padding: 0 16px; /* 내부 텍스트와 아이콘을 위한 패딩 */
    display: flex;
    align-items: center;
    justify-content: center; /* 텍스트와 아이콘 중앙 정렬 */
    cursor: pointer;
    transition: background-color 0.2s;
    align-self: flex-start; /* 왼쪽 정렬 */
  }

  .connect-button:hover {
    background-color: #e5e7eb; /* 약간 더 어두운 회색 (예시) */
  }

  .button-text {
    /* Figma "노션 연결하기" TEXT (6:541) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 16px;
    color: #1f2937; /* fill color */
    line-height: 1.21; /* lineHeightPx: 19.36 / fontSize: 16 */
    margin-right: 8px; /* 아이콘과의 간격 */
  }

  .button-icon {
    /* Figma "i" FRAME (6:521) -> svg (6:542) 대체 */
    color: #1f2937;
    font-size: 16px;
    font-weight: bold;
  }
</style>
