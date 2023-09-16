<script>
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import '../styles/global.css';
  import '../styles/tailwind.css';
</script>

<div class="mx-6 my-5 max-w-4xl sm:mx-12 md:mx-32 lg:mx-auto">
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</div>
