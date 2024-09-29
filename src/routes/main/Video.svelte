<script>
    // import video from "$lib/dummy/video.json";
    export let topic;
    export let n;
    export let N;
    $: show = topic?.type === 'video';

    import { onMount } from 'svelte';

    let player;
    let currentTime = 0;

    $: refreshPlayer(topic);
    $: if (show === false) {
        stopPlayer();
    }

    function stopPlayer() {
        if (player) {
            player.stopVideo();
        }
    }

    function refreshPlayer(topic) {
        let video;
        if (topic?.type === 'video') {
            video = topic.content;
        } else {
            return;
        }
        if (player) {
            player.loadVideoById({
                videoId: video.youtubeId,
                startSeconds: video.start,
                endSeconds: video.end
            });
            N = video.end - video.start;
        }
    }

    // Function to load the YouTube Iframe API dynamically
    function loadYouTubeAPI() {
        return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
        });
    }

    // This function is called by the YouTube API when it's ready
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
        width: '100%',
        height: '100%',
        videoId: 'ID',
        events: {
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            start: 0,
            end:  10,
            rel: 0,
            modestbranding: 1,
            controls: 0,
            autoplay: 1,
        }
        });
    }

    // Function to handle player state changes
    function onPlayerStateChange(event) {
        // if (event.data === YT.PlayerState.PLAYING || event.data === YT.PlayerState.PAUSED) {
        // const currentTime = player.getCurrentTime();
        // console.log("Current time:", currentTime);
        // }
    }

    // Use Svelte's onMount lifecycle to load the API and initialize the player
    onMount(async () => {
        await loadYouTubeAPI();
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        let interval = setInterval(() => {
            if (player && player.getCurrentTime) {
                currentTime = player.getCurrentTime();
                if (topic?.content?.start) {
                    n = currentTime - topic.content.start;
                }
            }
        }, 100);
        return () => {
            clearInterval(interval);
        }
    });
</script>

<div class="container"
    style:display={show ? 'flex' : 'none'}
>

<div id="player"
></div>

<!-- <iframe 
        src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1&start=${video.start}&end=${video.end}`}
        frameborder="0" 
        allowfullscreen>
</iframe> -->

</div>


<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        background-color: var(--panel);
    }
    #player {
    }

</style>