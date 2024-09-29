<script>
    import Video from "./Video.svelte";
    import MCQs from "./MCQs.svelte";
    import Flashcards from "./Flashcards.svelte";
    import { current_topic } from "$lib/stores";
    export let n;
    export let N;
    export let discrete = false;
    $: if ($current_topic?.type === "video") {
        discrete = false;
    }
    $: if ($current_topic?.type === "quiz" || $current_topic?.type === "flashcards") {
        discrete = true;
    }
</script>

<div class="container">
    <div class="blurrer">

        <Video topic={$current_topic} bind:n bind:N />

        {#if $current_topic?.type==="quiz"}
            <MCQs topic={$current_topic} bind:n bind:N />
        {:else if $current_topic?.type==="flashcards"}
            <Flashcards topic={$current_topic} bind:n bind:N />
        {/if}
    </div>
</div>


<style>
    .container {
        height: 100%;
        /* background-color: aqua; */
        width: 100%;
        background-image: url("./faust.png");
        background-size: cover;
        border: 2px solid var(--primary);
        border-radius: var(--radius);
        overflow: hidden;
        box-sizing: border-box;
    }
    .blurrer {
        backdrop-filter: blur(15px);
        height: 100%;
    }
</style>

