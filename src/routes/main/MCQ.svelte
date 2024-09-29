<script>
    import Video from "./Video.svelte";
    export let mcq;
    let selectedOption = -1;
    $: wrong = selectedOption !== -1 && selectedOption !== mcq.correct_answer_idx;
</script>

<div class="mcq">
    <div class="question">
        {mcq.question}
    </div>
    <div class="options">
        {#each mcq.options as option, index}
        <div class="option"
            on:click={() => selectedOption = (selectedOption === -1) ? index : selectedOption}
            class:selectedOption={selectedOption === index}
            class:correctSelection={selectedOption === index && index === mcq.correct_answer_idx}
            class:incorrectSelection={selectedOption === index && index !== mcq.correct_answer_idx}
        >
            {option}
        </div>
        {/each}
    </div>
    {#if wrong}
    <div class="option explanation">
        {mcq.explanation}
    </div>
    <!-- <div class="option explanation_video">
    <Video topic={{type: "video", content: {youtubeId: mcq.youtubeId, start: mcq.timestamp, end: 1000}}}/>
    </div> -->
    {/if}
</div>

<style>
    .mcq {
        min-height: 300px;
        width: 100%;
        outline: 2px solid var(--primary);
        background-color: var(--surface);
        border-radius: var(--radius);
        color: var(--primary);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        margin: 20px 0;
        padding: 10px;
        box-sizing: border-box;
    }
    .question {
        padding: 10px;
        font-size: 2rem;
        border-bottom: 1px solid lightgray;
    }
    .options {
        display: flex;
        flex-direction: column;
    }
    .option {
        padding: 10px;
        font-size: 1.4rem;
        border-bottom: 1px solid lightgray;
    }
    .option:hover {
        background-color: gainsboro;
    }
    .option.correctSelection {
        background-color: lightgreen;
    }
    .option.incorrectSelection {
        background-color: lightcoral;
    }
    .explanation {
        font-style: italic;
        height: 2.5rem;
        min-height: 2.5rem;
    }
    .explanation_video {

    }
</style>