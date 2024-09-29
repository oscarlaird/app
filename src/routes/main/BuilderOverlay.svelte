<script>
    let example_placeholders = ["Continuous Integration", "Kitchen Seasonings", "Constitutional Law", "How to Sing", "Knitting"]
    import { onMount } from "svelte";

    let i = 0;
    $: placeholder = example_placeholders[i];

    onMount(() => {
        setInterval(() => {
            i = (i + 1) % example_placeholders.length;
        }, 800);
    });

</script>

<div class="container">
    <div class="inner">
        <div class="i_want">
            I want to learn about...
        </div>
        <input type="text" placeholder={placeholder}
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

</style>