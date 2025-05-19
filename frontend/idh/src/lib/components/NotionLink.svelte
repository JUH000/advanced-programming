<script lang="ts">
  import { requestNotionRedirect } from '$lib/api/notion';

  async function handleNotionConnect() {
    try {
      await requestNotionRedirect();
    } catch (err) {
      alert(err.message || '노션 연동 중 오류가 발생했습니다.');
    }
  }
</script>

<div class="notion-link-container">
  <div class="header-section">
    <h2 class="section-title">노션 연동하기</h2>
  </div>
  <p class="section-description">노션 캘린더와 연동하여 학습 일정을 동기화하세요</p>

  <button class="connect-button" on:click={handleNotionConnect}>
    <span class="button-text">노션 연결하기</span>
    <span class="button-icon">+</span>
  </button>
</div>

<style>
  .notion-link-container {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    width: 896px;
    height: 196px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .section-title {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #1f2937;
    line-height: 1.2;
    margin: 0;
  }

  .section-description {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #4b5563;
    line-height: 1.21;
    margin: 0;
    margin-bottom: 16px;
    flex-grow: 1;
  }

  .connect-button {
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    width: 160.27px;
    height: 40px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    align-self: flex-start;
  }

  .connect-button:hover {
    background-color: #e5e7eb;
  }

  .button-text {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #1f2937;
    line-height: 1.21;
    margin-right: 8px;
  }

  .button-icon {
    color: #1f2937;
    font-size: 16px;
    font-weight: bold;
  }
</style>
