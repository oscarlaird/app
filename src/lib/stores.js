import topics_3 from '$lib/dummy/toplevel.json';
import { writable, derived } from 'svelte/store';

function takeFirstNElements(dict, n) {
    return Object.fromEntries(Object.entries(dict).slice(0, n));
}

let show_builder = writable(false);
let all_topics = writable(takeFirstNElements(topics_3, 2));
let curr_activity_idx = writable(0);

// let current_topic = writable(null);
let current_topic = derived([all_topics, curr_activity_idx], ([$all_topics, $curr_activity_idx]) => {
    return $all_topics[$curr_activity_idx];
});




export { current_topic, show_builder, all_topics, next_topic };


