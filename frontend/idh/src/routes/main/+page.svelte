<script>
  import Header from '$lib/components/Header.svelte';
  import Welcome from '$lib/components/Welcome.svelte';
  import MyInfoCard from '$lib/components/MyInfoCard.svelte';
  import PlanCard from '$lib/components/PlanCard.svelte';
  import NotionLink from '$lib/components/NotionLink.svelte';
</script>

<!-- 헤더 -->
<Header />

<!-- 전체 구조 -->
<div class="main-wrapper">
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

<style>
  /* 전체 화면을 100vh로 고정 */
  .main-wrapper {
    height: calc(100vh - 64px); /* 헤더(64px)를 제외한 나머지 영역 */
    background-color: #f3f4f6;
    display: flex;
    justify-content: center;
    overflow-y: hidden;
  }

  .main-content-area {
    width: 100%;
    max-width: 1280px;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content-column {
    width: 896px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 32px 0;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .cards-row {
    display: flex;
    justify-content: space-between;
    gap: 32px;
    box-sizing: border-box;
  }
</style>
