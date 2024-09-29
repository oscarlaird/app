<script>
    // import mcqs from "$lib/dummy/mcqs.json";
    export let topic;
    import { fly, fade } from 'svelte/transition';
    let mcqs = topic?.content;
    import MCQ from "./MCQ.svelte";
    export let n;
    export let N;
    N = mcqs.length;
    n = 2;
</script>

<div class="container"
    in:fly={{y: 1000, duration: 500}}
>
    {#each mcqs as mcq}
        <MCQ {mcq} />
    {/each}
</div>

<style>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        padding: 0 500px;
    }
</style>