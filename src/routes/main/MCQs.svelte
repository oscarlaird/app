<script>
    // import mcqs from "$lib/dummy/mcqs.json";
    export let topic;
    import { fly, fade } from 'svelte/transition';
    let mcqs = topic?.content;
    let loading = topic?.content === null;
    if (loading) {
        mcqs = [{question: "How long will you be waiting?", options: ["5s", "15s", "1m", "∞"], answer: ""}];
    }
    import { onMount } from 'svelte';
    import MCQ from "./MCQ.svelte";
    export let n;
    export let N;
    N = mcqs.length;
    n = 2;

    async function f() {
        await fetch(`http://127.0.0.1:5001/topics?topic=${topic.name}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let retrieved_mcqs = data["questions"].map((q) => {
                    return {
                        question: q['question'],
                        options: q['wrong_answers'].concat([q['correct_answer']]),
                        correct_answer_idx: 3,
                        explanation: q['explanation'],
                        youtubeId: data['id']
                    }
                });
                // {"question": "Who is the protagonist of the Faustian legend?", "options": ["Faust", "Mephistopheles", "Goethe", "Marlowe"], "correct_answer_idx": 0, "explanation": "Faust is the protagonist of the Faustian legend."},
                // block 2s TODO
                mcqs = retrieved_mcqs;
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
        max-height: 100%;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0 500px;
    }
</style>