<script>
    import topics from '$lib/dummy/topics_adv.json';
    import { current_topic } from '$lib/stores';
    import VideoIcon from './icons/VideoIcon.svelte';
    import QuizIcon from './icons/QuizIcon.svelte';
    import FlashcardsIcon from './icons/FlashcardsIcon.svelte';

    import topics_2 from '$lib/dummy/spaghetti.json';
    let activities = [];
    // iterate thru the topics_2 object
    for (let key in topics_2) {
        console.log(key);
        // video
        let activity = {};
        let content = {};
        activity['name'] = key;
        activity['type'] = 'video';
        content['youtubeId'] = topics_2[key]['id'];
        content['start'] = topics_2[key]['segment'][0];
        content['end'] = topics_2[key]['segment'][1];
        activity['content'] = content;
        activities.push(activity);
        // flashcards
        activity = {};
        content = {};
        activity['name'] = key;
        activity['type'] = 'flashcards';
        activity['content'] = topics_2[key]['questions'].map((q) => {
            return {
                'front': q['flashcard_question'],
                'back': q['flashcard_answer']
            }
        });
        activities.push(activity);


    }

</script>

{@debug topics, topics_2}

<div class="container">
    <div class="inner">
        <div class="subject row">
            Subject

        </div>
        <div class="current_topic row">
            {#if $current_topic}
                {$current_topic.name}
            {:else}
                Select a topic
            {/if}
        </div>
        <div class="topics">
            {#each activities as topic}
                <div class="topic row" on:click={() => current_topic.set(topic)}>
                    <div class="iconbox">
                    {#if topic.type==="video"}
                        <VideoIcon width="50px" height="50px" />
                    {:else if topic.type==="quiz"}
                        <QuizIcon width="50px" height="50px" />
                    {:else if topic.type==="flashcards"}
                        <FlashcardsIcon width="50px" height="50px" />
                    {/if}
                    </div>
                    <div class="rowtext">
                        {topic.name}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>

    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        color: var(--primary);
    }

    .inner {
        width: 100%;
        outline: 2px solid var(--primary);
        min-height: 300px;
        height: 100%;
        overflow: hidden;
        border-radius: var(--radius);
        display: flex;
        flex-direction: column;
    }
    .topics {
        height: 100%;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        background-color: var(--surface);

    }
    .row {
        width: 100%;
        display: flex;
        align-items: center;
        background-color: var(--surface);
        border-bottom: 1px solid var(--primary);
        padding: 10px 10px 10px 10px;
        box-sizing: border-box;
        font-size: 1.5rem;
    }
    .subject {
        font-size: 2rem;
        justify-content: center;
        border-top-left-radius: var(--radius);
        border-top-right-radius: var(--radius);
    }
    .current_topic, .subject {
        border-bottom-width: 2px;
        height: 70px;
    }
    .current_topic {
        display: none;
    }
    .topic.row {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
    .iconbox {
        height: 50px;
        width: 50px;
        /* outline: 2px solid red; */
    }

    .row:last-child {
        /* border-bottom: none;
        border-bottom-left-radius: var(--radius);
        border-bottom-right-radius: var(--radius); */
    }


    .topic:hover {
        background-color: #e0e0e0;
    }
</style>

