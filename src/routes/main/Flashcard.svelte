<script>
    export let card;
    export let curr_flashcard_idx;
    export let n_cards;
    export let container;
    export let idx;
    let card_box;
    let flipped = false;
    let hidden = card.front === "" && card.back === ""; // hide the first card
    console.log(card);
    function handleClick() {
        flipped = !flipped;
        curr_flashcard_idx = idx;
    }
    function handleKeydown(event) {
        console.log(event.key);
        if (event.key === " " || event.key === "Enter" || event.key === "ArrowDown" || event.key === "ArrowUp") {
            flipped = !flipped;
            if (event.key===" " ) {
                // curr_flashcard_idx = Math.min(curr_flashcard_idx + 1, n_cards - 1);
                setTimeout(() => {
                    curr_flashcard_idx = Math.min(curr_flashcard_idx + 1, n_cards - 1);
                }, 1000);
            }
        } else if (event.key === "ArrowRight") {
            curr_flashcard_idx = Math.min(curr_flashcard_idx + 1, n_cards - 1);
        } else if (event.key === "ArrowLeft") {
            curr_flashcard_idx = Math.max(curr_flashcard_idx - 1, 1);
        }
    }
    $: if (container && card_box && idx === curr_flashcard_idx) {
        let card_rect = card_box.getBoundingClientRect();
        let container_rect = container.getBoundingClientRect();
        container.scrollTo({
            left: card_rect.left - container_rect.left + container.scrollLeft - container_rect.width / 2 + card_rect.width / 2,
            behavior: "smooth"
        });
        // focus
        card_box.focus();
    }

</script>

<div class="flashcard"
    style:visibility={hidden ? "hidden" : "visible"}
    bind:this={card_box}
    class:flipped={flipped}
    on:click={handleClick}
    tabindex="0"
    on:keydown={handleKeydown}
>
    <div class="flashcard-inner">
      <div class="flashcard-front"
      >
        {card.front}
      </div>
      <div class="flashcard-back">
        {card.back}
      </div>
    </div>
</div>
  
<style>
.flashcard {
  perspective: 1000px; /* Gives the 3D effect */
  min-width: 500px;
  height: 300px;
  margin: 30px;
}

.flashcard-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d; /* Allows 3D transforms */
  transition: transform 0.6s; /* Smooth flip animation */
}

.flashcard-front, .flashcard-back {
  border-radius: var(--radius);
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* Prevents backface from showing when rotated */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--primary);
  text-align: center;
  border: 2px solid var(--primary);
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--surface);
  font-size: 2rem;
}

.flashcard-back {
  font-size: 2rem;
  transform: rotateY(180deg); /* Start with the back rotated */
}

/* When flipped, rotate the inner card */
.flipped .flashcard-inner {
  transform: rotateY(180deg);
}
.flashcard-front:focus, .flashcard-back:focus {
}

.flashcard:focus {
  outline: none;
  transform: scale(1.1);
  animation: transform 1.5s;
}

</style>