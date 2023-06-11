import { writable } from "svelte/store";

const location = writable<{
  lat: number;
  lng: number;
}>({ lat: 36.3742791, lng: 127.3603806 });

export default {
  subscribe: location.subscribe,
  set: location.set,
};
