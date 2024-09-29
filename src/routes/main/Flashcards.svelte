<script>
    // import real_flashcards from "$lib/dummy/flashcards.json";
    export let topic;
    import { fly, fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    let real_flashcards = topic?.content;
    let loading = topic?.content === null;
    import Flashcard from "./Flashcard.svelte";
    /* prepend a null card */
    // let flashcards = [{front: "", back: ""}, ...real_flashcards];
    let flashcards = [{front: "", back: ""}, {front: "Loading...", back: ""}];
    let curr_flashcard_idx = 1;
    let container;

    export let n;
    export let N;
    $: n = curr_flashcard_idx;
    $: N = flashcards.length - 1;

    async function f() {
        await fetch('./questions.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let retrieved_flashcards = data["questions"].map((q) => {
                    return {
                        'front': q['flashcard_question'],
                        'back': q['flashcard_answer']
                    }
                });
                // block 2s TODO
                flashcards = [{front: "", back: ""}, ...retrieved_flashcards];
                loading = false;
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }

    onMount(async () => {
        // fetch the flashcards from the server

        setTimeout(() => {
            f();
        }, 1000);
        
    });
</script>

<div class="container" bind:this={container}
   in:fly={{x: +1000, duration: 500}} 
>
    {#each flashcards as flashcard, i}
        <Flashcard card={flashcard} n_cards={flashcards.length} bind:curr_flashcard_idx container={container} idx={i}/>
    {/each}
    <div class="instructions">
        Click on the card to flip it.
        Use the arrow keys to navigate.
        Press the space bar to flip the card.
    </div>
</div>

<style>
    .container {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        overflow: hidden;
        padding: 20px;
        overflow-x: scroll;
        scroll-behavior: smooth; /* Smooth scrolling */

        /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;   /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    .flashcards-container::-webkit-scrollbar {
        display: none; /* Hide scrollbar for Webkit browsers */
    }

    .instructions {
        font-size: 1.2em;
        position: absolute;
        bottom: 20px;
        left: 50%;
        padding: 20px;
        transform: translateX(-50%);
        background-color: var(--surface);
        font-style: italic;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
        border: 1px solid var(--primary);
        color: var(--primary);
    }
</style>