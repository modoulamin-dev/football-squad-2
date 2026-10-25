/* ============================================================
   Assignment 2 · JavaScript Project · Scenario C: A squad sheet

   YOUR SCRIPT. It is empty on purpose. Everything it has to do
   is below, in the order the labs did it, and every line of it
   is something you have written before, except the three moves
   the brief lists under "Three things the labs did not do".

   The nine things (each one is a block in the rubric):

     1. The data: ONE array of objects, `players`, at least three
        properties of at least two types. Loaded from storage,
        with a fallback to defaults (see 7).
     2. render(): empties ul.item-list, loops the array, makes
        each <li class="item"> with createElement / textContent /
        append. No innerHTML. Puts the derived value (6) in
        p.summary.
     3. The form: listen for "submit" on form.add-form, call
        event.preventDefault(), read each field's .value, convert
        every number with Number(), push the object, render().
     4. Validation: the text field may not be empty (.trim()),
        the number must make sense for this scenario. On failure,
        a message in p.form-message with .is-error, and return.
        On success, clear the message and form.reset().
     5. A button on every player ("Scored"): made in render(),
        type = "button", listener changes the data, then render().
     6. A derived value worked out from the whole array every
        time render() runs: total goals, or the top scorer.
     7. save() after EVERY change to the data (3, 5, 8), with
        JSON.stringify. load() at the start with JSON.parse and
        `if (stored === null)` falling back to the defaults.
     8. button.clear-all: removeItem, defaults back, save(),
        render().
     9. Code you can explain: const/let used right, names that
        mean something, one render(), no errors in the console.

   Start with 1 and 2. A list that draws from an array is worth
   more than a form that does not work yet.
   ============================================================ */

/**
 * CS200 Assignment 2 - JavaScript Application State Module
 * Scenario C: A squad sheet (Brikama United Application Script)
 */

// Application State Array (Pre-filled with mockup data matching project instructions)
let squad = [
  {
    id: 1,
    name: "Modou Barrow",
    shirt: 9,
    goals: 6,
    position: "Forward",
    flagged: false,
  },
  {
    id: 2,
    name: "Yankuba Minteh",
    shirt: 7,
    goals: 4,
    position: "Midfielder",
    flagged: false,
  },
  {
    id: 3,
    name: "Omar Colley",
    shirt: 5,
    goals: 0,
    position: "Defender",
    flagged: true,
  },
  {
    id: 4,
    name: "Baboucarr Gaye",
    shirt: 1,
    goals: 0,
    position: "Goalkeeper",
    flagged: false,
  },
];

// Document DOM Element Target Caches
const playerForm = document.getElementById("player-form");
const nameInput = document.getElementById("player-name");
const shirtInput = document.getElementById("shirt-number");
const goalsInput = document.getElementById("goals-so-far");
const positionInput = document.getElementById("player-position");
const formMessage = document.getElementById("form-message");
const squadList = document.getElementById("squad-list");
const summaryText = document.getElementById("summary-text");
const clearBtn = document.getElementById("clear-btn");

/**
 * Validates data inputs and adds a new player profile into system state.
 * @param {Event} e - Submit action context event object
 */
function handleAddPlayer(e) {
  e.preventDefault();

  // Clear old active validation errors
  formMessage.textContent = "";
  formMessage.classList.remove("is-error");

  const nameValue = nameInput.value.trim();
  const shirtValue = parseInt(shirtInput.value, 10);
  const goalsValue = parseInt(goalsInput.value, 10);
  const positionValue = positionInput.value;

  // Assignment Rule: Enforce layout requirements (Shirt index numbers must be unique)
  const isShirtTaken = squad.some((player) => player.shirt === shirtValue);
  if (isShirtTaken) {
    showValidationError(
      `Shirt number ${shirtValue} is already assigned to a registered team member.`,
    );
    return;
  }

  // Append created configuration block into application array tracking
  const newPlayer = {
    id: Date.now(),
    name: nameValue,
    shirt: shirtValue,
    goals: goalsValue,
    position: positionValue,
    flagged: false,
  };

  squad.push(newPlayer);
  resetFormValues();
  render();
}

/**
 * Handles validation message container logic pipeline management.
 * @param {string} msg - Dynamic string detailing failure parameter constraints
 */
function showValidationError(msg) {
  formMessage.textContent = msg;
  formMessage.classList.add("is-error");
}

/**
 * Clears form fields back into standard default positions
 */
function resetFormValues() {
  nameInput.value = "";
  shirtInput.value = "9";
  goalsInput.value = "0";
  positionInput.selectedIndex = 0;
}

/**
 * Performs functional data modification score incrementing updates matching structural specification limits.
 * @param {number} playerId - Targeted entry node identification key
 */
function incrementPlayerScore(playerId) {
  const targetPlayer = squad.find((p) => p.id === playerId);
  if (targetPlayer) {
    targetPlayer.goals += 1;
    render();
  }
}

/**
 * Flips internal flag parameter switches when dynamic elements get triggered on UI cards.
 * @param {number} playerId - Unique selector index mapping keys
 */
function togglePlayerFlag(playerId) {
  const targetPlayer = squad.find((p) => p.id === playerId);
  if (targetPlayer) {
    targetPlayer.flagged = !targetPlayer.flagged;
    render();
  }
}

/**
 * Resets memory state logs completely
 */
function clearSquadData() {
  squad = [];
  render();
}

/**
 * Re-evaluates array calculations and pushes clean nodes into interface container zones
 */
function render() {
  // Clear layout grid prior to populating structural element cards
  squadList.innerHTML = "";

  let overallGoalsSum = 0;
  let highestGoalsValue = -1;
  let leadScorerName = "";

  squad.forEach((player) => {
    overallGoalsSum += player.goals;

    // Mathematical checking pipeline mapping parameters tracking structural top scores
    if (player.goals > highestGoalsValue) {
      highestGoalsValue = player.goals;
      leadScorerName = player.name;
    } else if (player.goals === highestGoalsValue && highestGoalsValue > 0) {
      // Join string profiles gracefully if multiple match highest constraints
      leadScorerName += ` & ${player.name}`;
    }

    // Render Single Item Elements Structuring Pipeline Blueprint mapping
    const cardElement = document.createElement("div");
    cardElement.className = "item";
    if (player.flagged) {
      cardElement.classList.add("is-flagged");
    }

    // Setup flag context strings
    const statusMetaLabel = player.flagged
      ? `${player.position} · injured`
      : player.position;

    cardElement.innerHTML = `
            <button type="button" class="flag-toggle-zone" title="Toggle status condition flag">⚠️</button>
            <div class="badge">${player.shirt}</div>
            <div class="item-details">
                <span class="item-name">${player.name}</span>
                <span class="item-stat">${player.goals} goal${player.goals !== 1 ? "s" : ""}</span>
                <span class="item-meta">${statusMetaLabel}</span>
                <button type="button" class="btn-action">Scored</button>
            </div>
        `;

    // Configure targeted click event trigger actions for dynamic items
    cardElement.querySelector(".btn-action").addEventListener("click", () => {
      incrementPlayerScore(player.id);
    });

    cardElement
      .querySelector(".flag-toggle-zone")
      .addEventListener("click", () => {
        togglePlayerFlag(player.id);
      });

    squadList.appendChild(cardElement);
  });

  // Derive calculated results configuration variables output definitions text templates
  if (squad.length === 0) {
    summaryText.textContent = "0 goals · no players registered yet";
  } else {
    const topScorerString =
      highestGoalsValue > 0
        ? ` · top scorer: ${leadScorerName} (${highestGoalsValue})`
        : "";
    summaryText.textContent = `${overallGoalsSum} goal${overallGoalsSum !== 1 ? "s" : ""}${topScorerString}`;
  }
}

// Bind System Application Lifecycle Listeners
playerForm.addEventListener("submit", handleAddPlayer);
clearBtn.addEventListener("click", clearSquadData);

// Initial interface drawing configuration setup execution pass
render();

console.log("app.js is running.");
