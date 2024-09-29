import topics_3 from '$lib/dummy/toplevel.json';
import { writable } from 'svelte/store';

function takeFirstNElements(dict, n) {
    return Object.fromEntries(Object.entries(dict).slice(0, n));
}

let current_topic = writable(null);
let show_builder = writable(false);
let all_topics = writable(takeFirstNElements(topics_3, 2));


export { current_topic, show_builder, all_topics };


