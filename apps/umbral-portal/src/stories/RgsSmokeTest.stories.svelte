<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import RgsSmokeTest from './RgsSmokeTest.svelte';

  const { Story } = defineMeta({
    title: 'dev/RgsSmokeTest',
    component: RgsSmokeTest,
  });
</script>

<Story name="Default" />
