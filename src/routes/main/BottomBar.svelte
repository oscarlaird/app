<script>
    import ProgressBar from "./ProgressBar.svelte";
    import { current_topic, next_topic } from "$lib/stores";
    export let n;
    export let N;
    export let discrete;


</script>

{@debug $next_topic}
<div class="container">
    <button class="button back">Back</button>
    <ProgressBar n={n} N={N} discrete={discrete} />
    <button class="button forward">Up Next: Video</button>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0;
        gap: 10px;
        box-sizing: border-box;
    }
    .button {
        width: 300px;
        height: 100%;
        border-radius: var(--radius);
        border: none;
        font-size: 1.6rem;
        border: 2px solid var(--primary);
        background-color: var(--surface);
        color: var(--primary);
    }
    .forward {
        font-weight: bold;
    }
</style>