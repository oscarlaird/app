import { writable } from 'svelte/store';


let current_topic = writable(null);
let show_builder = writable(false);


export { current_topic, show_builder };


