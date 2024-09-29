<script>
    import Sidebar from "./Sidebar.svelte";
    import Content from "./Content.svelte";
    import BottomBar from "./BottomBar.svelte";
    import { current_topic, show_builder } from "$lib/stores";
    import BuilderOverlay from "./BuilderOverlay.svelte";
    $: topic_title =  $current_topic?.name + " (" + $current_topic?.type.toUpperCase() + ")";
    let n;
    let N;
    let discrete = true;

</script>


<div class="container">
    <div class="sidebar_container">
        <Sidebar />
    </div>
    <div class="content_and_bottom_container">
        <div class="topic_title">
            {topic_title}
        </div>
        <div class="content_container">
            <Content bind:n bind:N bind:discrete />
        </div>
        <div class="bottom_container">
            <BottomBar n={n} N={N} discrete={discrete} />
        </div>
    </div>

    {#if $show_builder}
        <BuilderOverlay />
    {/if}

</div>



<style>
    .container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        gap: 10px;
        position: relative;
    }

    .sidebar_container {
        width: 20%;
        height: 100%;
        background-color: var(--panel);
        /* border-right: 2px solid black; */
    }

    .content_and_bottom_container {
        width: 80%;
        height: 100%;
        max-height: 1400px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: space-between;
        box-sizing: border-box;
    }

    .content_container {
        width: 100%;
        flex: 1;
        background-color: var(--panel);
        overflow-y: scroll;
        padding: 0 0px;
        box-sizing: border-box;
    }

    .bottom_container {
        width: 100%;
        height: 80px;
    }
    .topic_title {
        font-size: 2rem;
        width: 100%;
        height: 80px;
        background-color: var(--surface);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--primary);
        border: 2px solid var(--primary);
        box-sizing: border-box;
        border-radius: var(--radius);
    }

</style>