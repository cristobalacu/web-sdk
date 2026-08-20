<script lang="ts">
  import { playRound } from '../game/rgsClient';

  let result = $state<string>('(sin ejecutar)');

  async function run() {
    result = 'cargando...';
    try {
      const round = await playRound('dev-session', 1000000);
      result = JSON.stringify(round, null, 2);
    } catch (err) {
      result = `Error: ${(err as Error).message}`;
    }
  }
</script>

<button onclick={run}>Jugar ronda de prueba ($1.00)</button>
<pre>{result}</pre>
