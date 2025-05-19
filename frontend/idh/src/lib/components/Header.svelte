<script>
  import { CalendarCheck } from 'lucide-svelte';
  import { goto } from '$app/navigation';
</script>

<header class="app-header">
  <div class="header-container">
    <div class="logo-section">
      <CalendarCheck color="#1f2937" size={28} />
      <span class="logo-text">AutoPlanner</span>
    </div>
    <nav class="navigation-section">
      <a href="/main" class="nav-item">메인화면</a>
      <!-- <span class="nav-item" on:click={() => goto('/main')}>메인화면</span> -->
      <a href="/profile" class="nav-item profile-item">프로필</a>
    </nav>
  </div>
</header>

<style>
  .app-header {
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    height: 64px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  .header-container {
    width: 100%;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    padding-right: 24px;  
    box-sizing: border-box;
  }


  .logo-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo-text {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1.25rem;
    color: #1f2937;
    line-height: 1;
  }

  .navigation-section {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .nav-item {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #4b5563;
    text-decoration: none;
    line-height: 1;
  }

  .nav-item:hover {
    color: #1f2937;
    text-decoration: underline;
  }
</style>
