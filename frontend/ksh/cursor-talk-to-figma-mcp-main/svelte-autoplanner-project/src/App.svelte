<script>
  // 다음 단계에서 생성될 컴포넌트들을 임포트합니다.
  import Header from './components/Header.svelte';
  import Welcome from './components/Welcome.svelte';
  import MyInfoCard from './components/MyInfoCard.svelte';
  import PlanCard from './components/PlanCard.svelte';
  import NotionLink from './components/NotionLink.svelte';
</script>

<div class="app-container">
  <div class="content-wrapper">
    <Header />
    <section class="main-content-area">
      <div class="content-column">
        <Welcome />
        <div class="cards-row">
          <MyInfoCard />
          <PlanCard />
        </div>
        <NotionLink />
      </div>
    </section>
  </div>
</div>

<style>
  .app-container {
    /* Figma "Main" (6:433) 스타일 */
    width: 1440px;
    height: 929px;
    background-color: #ffffff; /* Main 프레임 배경색 */
    border: 1px solid #ced4da; /* Main 프레임 테두리 */
    border-radius: 8px; /* Main 프레임 모서리 둥글기 */
    margin: auto; 
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
  }

  .content-wrapper {
    /* Figma "main" (6:435) 스타일 - 헤더와 메인 컨텐츠를 감싸는 역할 */
    background-color: #f3f4f6; /* "main" 프레임 배경색 (연한 회색) */
    flex: 1; 
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* 컨텐츠가 넘칠 경우 스크롤 */
    box-sizing: border-box;
  }

  /* Header.svelte 컴포넌트가 이 아래에 위치하며, 자체 스타일(예: 흰색 배경)을 가집니다. */

  .main-content-area {
    /* Figma "section" (6:437) 스타일 - 실제 컨텐츠가 표시되는 영역 */
    width: 1280px; /* section 프레임 너비 */
    margin: 0 auto; /* 부모(.content-wrapper) 내에서 중앙 정렬 */
    display: flex;
    flex-direction: column;
    align-items: center; /* 자식 요소(.content-column)를 중앙 정렬 */
    flex-grow: 1;
    box-sizing: border-box;
    /* Header 높이만큼의 공간은 Header 컴포넌트가 차지하므로 별도 top padding 불필요 */
  }

  .content-column {
    /* Figma "div" (6:440) 스타일 - Welcome, Cards, NotionLink를 담는 컬럼 */
    width: 896px; /* div 프레임 너비 */
    display: flex;
    flex-direction: column;
    gap: 48px; /* Figma 요소들 간의 수직 간격 (Welcome, Cards row, NotionLink) */
    padding-top: 64px; /* section 상단에서 Welcome 메시지까지의 여백 */
    padding-bottom: 64px; /* 컨텐츠 하단 여백 */
    box-sizing: border-box;
  }

  .cards-row {
    /* Figma "div" (6:445) 스타일 - MyInfoCard와 PlanCard를 가로로 배열 */
    display: flex;
    justify-content: space-between; /* 카드 사이에 공간을 두고 양쪽으로 정렬 */
    gap: 32px; /* MyInfoCard와 PlanCard 사이의 간격 */
    box-sizing: border-box;
  }
</style> 