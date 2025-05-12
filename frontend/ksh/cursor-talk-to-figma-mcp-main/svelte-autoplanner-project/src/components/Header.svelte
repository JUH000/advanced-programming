<script>
  // 현재는 스크립트 로직이 필요 없지만, 향후 확장성을 위해 남겨둡니다.
  // 예를 들어, 프로필 드롭다운 메뉴 표시/숨김 로직 등이 추가될 수 있습니다.
</script>

<header class="app-header">
  <div class="header-container">
    <div class="logo-section">
      <a href="/" class="logo-text">AutoPlanner</a>
    </div>
    <nav class="navigation-section">
      <a href="/calendar" class="nav-item">캘린더</a>
      <a href="/profile" class="nav-item profile-item">프로필</a>
      <!-- 
        실제 애플리케이션에서는 "프로필" 링크 클릭 시 드롭다운 메뉴가 표시될 수 있습니다.
        (Figma 노드 58:2, 58:5, 58:6, 58:7, 58:8 관련)
        이 부분은 추후 ProfileMenu.svelte 컴포넌트로 분리하거나 기능을 추가할 수 있습니다.
      -->
    </nav>
  </div>
</header>

<style>
  .app-header {
    /* Figma "header" (6:436) 스타일 */
    background-color: #ffffff; /* fill color */
    border-bottom: 1px solid #e5e7eb; /* stroke color */
    height: 64px; /* height */
    width: 100%;
    display: flex;
    justify-content: center; /* .header-container를 중앙 정렬 */
    align-items: center;
    box-sizing: border-box;
  }

  .header-container {
    /* 
      Figma에서 main content section (6:437)의 너비가 1280px이므로,
      헤더 내부 컨텐츠도 이에 맞춰 정렬합니다.
    */
    width: 100%;
    max-width: 1280px; 
    display: flex;
    justify-content: space-between; /* 로고와 네비게이션 양쪽 정렬 */
    align-items: center;
    padding: 0 24px; /* 헤더 내부 컨텐츠 좌우 여백 (Figma 기준 추정) */
                     /* Figma "AutoPlanner" 텍스트(6:2109) x:2876, section(6:437) x:2850 -> 26px 여백 */
                     /* Figma 네비게이션 영역(6:443) 끝 x:4114, section(6:437) 끝 x:4130 -> 16px 여백 */
                     /* 대략적인 평균 또는 디자인 일관성을 위해 24px 적용 */
    box-sizing: border-box;
  }

  .logo-section .logo-text {
    /* Figma "AutoPlanner" TEXT (6:2109) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 20px;
    color: #1f2937; /* fill color */
    text-decoration: none;
    line-height: 1; /* Figma lineHeightPx: 20 */
  }

  .navigation-section {
    display: flex;
    align-items: center;
    /* Figma "캘린더"(6:457)와 프로필 아이콘 영역(6:458) 사이 간격 추정: 27px */
    gap: 28px; 
  }

  .nav-item {
    /* Figma "캘린더" TEXT (6:457) 스타일 */
    font-family: 'Inter', sans-serif;
    font-weight: 400; /* Regular */
    font-size: 16px;
    color: #4b5563; /* fill color */
    text-decoration: none;
    line-height: 1; /* Figma lineHeightPx: 16 */
  }

  .nav-item:hover {
    color: #1f2937; /* 호버 시 색상 변경 (예시) */
    text-decoration: underline;
  }

  /* .profile-item 에 대한 추가 스타일링이 필요하다면 여기에 작성합니다. */
  /* 예를 들어, 아이콘 버튼 형태로 만들 경우 등 */
</style> 