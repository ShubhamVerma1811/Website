<script>
  import { CURRENT_ORGANIZATION, CURRENT_TITLE, HIRE_MAIL, RESUME_URL } from '$lib/constants';
  import DiagonalArrow from './Icons/DiagonalArrow.svelte';
</script>

<div class="flex flex-col-reverse md:flex-row">
  <div>
    <p class="font-secondary text-3xl font-bold text-skin-secondary">Shubham Verma</p>
    <p class="mt-2 text-lg text-skin-primary-muted">
      {CURRENT_TITLE} at <strong>{CURRENT_ORGANIZATION}</strong>
    </p>
    <!-- {/* <p class='text-md mt-3 text-skin-primary-muted md:text-lg'>
          I like to build open source tools and write articles.
        </p> */} -->

    <div class="flex flex-wrap items-center">
      <a
        target="_blank"
        href={`mailto:${HIRE_MAIL}`}
        class="umami--click--hero-calendar text-md mt-3 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted md:text-lg"
        rel="noopener noreferrer">
        Hire Me
        <DiagonalArrow props={{ class: 'inline text-xl' }} />
      </a>
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        class="umami--click--hero-resume mr-2 mt-3 w-max rounded-md p-2 text-lg text-skin-secondary underline underline-offset-4 hover:bg-skin-secondary-muted">
        Resume
        <DiagonalArrow props={{ class: 'inline text-xl' }} />
      </a>
    </div>
  </div>
  <div class="overflow-clip md:ml-auto md:mr-0">
    <img
      src="https://avatars.githubusercontent.com/u/25576658"
      alt="Shubham Verma"
      width="120"
      height="120"
      class="rounded-full"
      title="Shubham Verma" />
  </div>
</div>
