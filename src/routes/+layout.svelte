<script>
    import '../app.css';
    import { show_builder } from '$lib/stores';
</script>

<div class="container">
    <div class="header">
        <div class="course_crafter_title">
            Course Craftr
        </div>
        <div class="explore">
            Explore
        </div>
        <div class="create_course"
            on:click={() => show_builder.set(!$show_builder)}
        >
            I want to learn about...
        </div>
    </div>
    <div class="slot_container">
        <slot></slot>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }

    .header {
        font-size: 2em;
        height: 60px;
        width: 100%;
        background-color: var(--primary);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .course_crafter_title, .create_course {
        margin: 10px;
    }
    .create_course:hover, .explore:hover{
        cursor: pointer;
        text-decoration: underline;
    }

    .slot_container {
        width: 100%;
        height: 100%;
    }
</style>