/*  
 * DOCU: Handles the dynamic character selection for a Valorant-style UI.  
 *       Updates the right display panel with the selected agent's image, name, role, description, and ability.
 *       Plays the agent's audio and ensures only one audio plays at a time.  
 *       Clicking the same agent again will deselect it and stop the audio.  
 *  
 * Last Updated: 2026-02-21  
 * Author: Janverly Bacani  
 */

const agents = document.querySelectorAll('.agent');
const mainImage = document.getElementById('main-image');
const nameDisplay = document.getElementById('agent-name');
const roleDisplay = document.getElementById('agent-role');
const descriptionDisplay = document.getElementById('agent-description');
const abilityDisplay = document.getElementById('agent-ability');

let currentAgent = null;

// Store full abilities
const abilities = {
    viperAbility: `POISON CLOUD
EQUIP a gas emitter. FIRE to throw it. RE-USE to create a toxic gas cloud.`,

    cloveAbility: `MEDDLE
EQUIP a fragment of immortality essence. FIRE to throw it, decaying targets.`,

    sageAbility: `SLOW ORB
EQUIP a slowing orb. FIRE to throw it forward. Slows players in the field.`,

    deadlockAbility: `SONIC SENSOR
EQUIP a Sonic Sensor. FIRE to deploy it. Concusses enemies in the area.`,

    killjoyAbility: `ALARMBOT
FIRE to deploy a bot that hunts enemies. Explodes on target, applying Vulnerable.`,

    reynaAbility: `DEVOUR
Enemies killed leave Soul Orbs. INSTANTLY consume an orb to heal rapidly.`,

    razeAbility: `BLAST PACK
Throw a Blast Pack. RE-USE to detonate, damaging anything hit.`,

    vyseAbility: `SHEAR
Place a hidden wall trap. When enemies cross, a wall bursts behind them.`,

    skyeAbility: `TRAILBLAZER
EQUIP a Tasmanian tiger trinket. FIRE to control it and explode to damage enemies.`
};

agents.forEach(agent => {
    agent.addEventListener('click', function () {

        const audio = this.querySelector('audio');

        // Toggle if clicking the same agent
        if (currentAgent === this) {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            this.classList.remove('selected');
            currentAgent = null;
            abilityDisplay.textContent = '';
            return;
        }

        // Stop all other audios
        document.querySelectorAll('.agent audio').forEach(a => {
            a.pause();
            a.currentTime = 0;
        });

        // Remove highlight from all
        agents.forEach(a => a.classList.remove('selected'));

        // Highlight clicked agent
        this.classList.add('selected');
        currentAgent = this;

        // Update UI dynamically
        mainImage.src = this.dataset.image;
        nameDisplay.textContent = this.dataset.name;
        roleDisplay.textContent = this.dataset.role;
        descriptionDisplay.textContent = this.dataset.description;
        abilityDisplay.textContent = abilities[this.dataset.ability] || '';

        if (audio) audio.play();
    });
});