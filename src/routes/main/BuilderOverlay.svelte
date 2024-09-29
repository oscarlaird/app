<script>
    let example_placeholders = ["Continuous Integration", "Kitchen Seasonings", "Constitutional Law", "How to Sing", "Knitting"]
    let fake_generation_processes = ["Brainstorming Topics", "Choosing Videos", "Writing Quizzes", "Authoring Flashcards", "Generating Content"]
    import { show_builder } from "$lib/stores";
    import { onMount } from "svelte";
    import ProgressBar from "./ProgressBar.svelte";
    import { tweened } from "svelte/motion";
    import topics_3 from '$lib/dummy/toplevel.json';
    import { all_topics } from '$lib/stores';
    let generating;
    let fake_progress = tweened(0, { duration: 2000 });
    let subject;

    let i = 0;
    let fake_process_idx = 0;
    $: placeholder = example_placeholders[i];
    $: fake_process = fake_generation_processes[fake_process_idx];

    async function f() {

    }

    onMount(() => {
        setInterval(() => {
            i = (i + 1) % example_placeholders.length;
        }, 800);
        setInterval(() => {
            fake_process_idx = (fake_process_idx + 1) % fake_generation_processes.length;
            if (fake_process_idx === 0) {
                fake_process_idx = fake_generation_processes.length - 1;
            }
        }, 2500);

    });

    function handleKeypress(event) {
        /* turn off show builder on pressing escape */
        if (event.key === "Escape") {
            console.log("Escape pressed");
            show_builder.set(false);
            event.preventDefault();
        } else if (event.key === "Enter") {
            console.log("Enter pressed");
            let fake_completion_promise = fake_progress.set(100);
            // all_topics.set(topics_3);
            let dataload_promise = fetch(`http://127.0.0.1:5001/subjects?subject=${subject}`)
                .then(response => response.json())
                .then(data => {
                    console.log('data loaded', data);
                    all_topics.set(data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
            });
            fake_completion_promise.then(() => {
                generating = false;
                show_builder.set(false);
            });
            generating = true; 
            event.preventDefault();
        }
    };

</script>

<div class="container"
>
    <div class="inner">
        {#if generating}
            <div class="i_want">
            {fake_process}...
            </div>
            <div class="prog_container">
                <ProgressBar n={$fake_progress} N={100.0} discrete={false} />
            </div>
        {/if}
        <div class="i_want">
            I want to learn about...
        </div>
        <input type="text" placeholder={placeholder}
            bind:value={subject}
            on:keydown={handleKeypress}
            autofocus
        />
    </div>
</div>


<style>
    .container {
        height: 100%;
        /* background-color: aqua; */
        width: 100%;
        backdrop-filter: blur(7px) saturate(50%) contrast(20%) brightness(130%);
        position: absolute;
        margin: 0;
        padding: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }
    .inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    .i_want {
        font-size: 10rem;
        color: var(--primary);
    }
    input {
        font-size: 10rem;
        border: none;
        display: block;
        background-color: transparent;
        color: var(--primary);
        outline: none;
        /* don't blink the cursor */
        caret-color: black; 
        animation: none;
    }
    .prog_container {
        width: 100%;
        height: 100px;
        margin-bottom: 200px;
    }
</style>