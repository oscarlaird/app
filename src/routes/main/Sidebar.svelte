<script>
    import topics from '$lib/dummy/topics_adv.json';
    import { current_topic } from '$lib/stores';
    import VideoIcon from './icons/VideoIcon.svelte';
    import QuizIcon from './icons/QuizIcon.svelte';
    import FlashcardsIcon from './icons/FlashcardsIcon.svelte';

    import topics_2 from '$lib/dummy/spaghetti.json';
    import topics_3 from '$lib/dummy/toplevel.json';
    import { all_topics } from '$lib/stores';
    let activities = [];


    let acts3 = [];
    console.log('topics3', topics_3);
    function build_acts3_from_all_topics() {
        let acts = [];
        for (let key in $all_topics) {
            // video activity
            let activity = {};
            let content = {};
            activity['name'] = key;
            activity['type'] = 'video';
            content['youtubeId'] = $all_topics[key]['id'];
            content['start'] = 0;
            content['end'] = 300;
            activity['content'] = content;
            activity['depth'] = 0;
            acts.push(activity);
            // flashcard activities
            activity = {};
            content = {};
            activity['name'] = key;
            activity['type'] = 'flashcards';
            content['youtubeId'] = $all_topics[key]['id'];
            activity['content'] = null;
            activity['depth'] = 1;
            acts.push(activity);
            // quiz activities
            activity = {};
            content = {};
            activity['name'] = key;
            activity['type'] = 'quiz';
            content['youtubeId'] = $all_topics[key]['id'];
            activity['content'] = null;
            activity['depth'] = 1;
            acts.push(activity); 
        }
        return acts;
    }
    acts3 = build_acts3_from_all_topics();

    all_topics.subscribe((value) => {
        console.log('all_topics', value);
        acts3 = build_acts3_from_all_topics();
    });


    // iterate thru the topics_2 object
    for (let key in topics_2) {
        // video
        let activity = {};
        let content = {};
        activity['name'] = key;
        activity['type'] = 'video';
        content['youtubeId'] = topics_2[key]['id'];
        content['start'] = topics_2[key]['segment'][0];
        content['end'] = topics_2[key]['segment'][1];
        activity['content'] = content;
        activity['depth'] = 0;
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
        activity['depth'] = 1;
        activities.push(activity);
        // quiz
        activity = {};
        content = {};
        activity['name'] = key;
        activity['type'] = 'quiz';
        activity['content'] = topics_2[key]['questions'].map((q) => {
            return {
                'question': q['question'],
                'options': q['wrong_answers'].concat([q['correct_answer']]),
                'correct_answer_idx': 3,
                'explanation': q['explanation'],
                'timestamp': q['timestamp'],
                'youtubeId': topics_2[key]['id'] // n.b. every single mcq carries the same video id, whereas it is only stated once in video content
            }
        });
        activity['depth'] = 1;
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
            {#each acts3 as topic}
                <div class="topic row" on:click={() => current_topic.set(topic)}>
                    {#each Array.from({length: topic?.depth || 0}) as _}
                        <div class="iconbox indentbox">
                        </div>
                    {/each}
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
        /* outline: 1px solid red; */
    }

    .inner {
        width: 100%;
        outline: 2px solid var(--primary);
        height: 1400px;
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
        position: relative;
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
    .depth_button {
        position: absolute;
        right: 10px;
        height: 50px;
        width: 50px;
        color: var(--surface);
        border-color: var(--surface);
        background-color: var(--primary);
        border-width: 2px;
        border-style: solid;

        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .depth_button:hover {
        background-color: var(--surface);
        color: var(--primary);
        border-color: var(--primary);
        transform: scale(1.0);
    }
</style>

