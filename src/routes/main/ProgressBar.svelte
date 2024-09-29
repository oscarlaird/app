<script>
    export let n = 1;
    export let N = 10;
    export let discrete = true;
    import { tweened } from "svelte/motion";
    $: discrete_text = `${n}/${N}`;
    $: percentage = Math.min(parseFloat(n) / parseFloat(N) * 100.0, 100.0);
    $: percentage_text = `${Math.round(percentage)}%`;
    $: full = discrete ? (n === N) : (percentage >= 99.0);
    $: text = full ? "" : (discrete ? discrete_text : percentage_text);

    let tweened_percentage = tweened(0);
    $: tweened_percentage.set(percentage);



</script>

<div class="background bar">
    <div class="inner bar"
        style:width={$tweened_percentage + "%"}
        style:border-top-right-radius={full ? "calc(var(--radius) - 5px)" : "0px"}
        style:border-bottom-right-radius={full ? "calc(var(--radius) - 5px)" : "0px"}
    >
    </div>
    <div class="text">{text}</div>
</div>


<style>
    .background {
        border-radius: var(--radius);
        width: 100%;
        height: 100%;
        background-color: var(--surface);
        border: 2px solid var(--primary);
        position: relative;
    }
    .inner {
        border-top-left-radius: calc(var(--radius) - 5px);
        border-bottom-left-radius: calc(var(--radius) - 5px);
        height: 100%;
        background-color: var(--primary);
    }
    .text {
        position: absolute;
        top: 0;
        right: 30px;
        height: 100%;
        color: var(--primary);
        display: flex;
        align-items: center;
        font-size: 2rem;


    }
</style>