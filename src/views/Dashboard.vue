<template>
  <div style="padding: 80px;">
    <p>
      Name -> {{ character.name }} <br>
      Alter -> {{ character.age }} <br>
      Herlunft -> {{ character.origin }} <br>
      <br>
      Lebenspunkte -> {{ character.baseStats.lifePoints.current }} / {{ character.baseStats.lifePoints.default }} <br>
      Kraft -> {{ character.baseStats.strength.current }} / {{ character.baseStats.strength.default }} <br>
      Akrobatik -> {{ character.baseStats.acrobatics.current }} / {{ character.baseStats.acrobatics.default }} <br>
      Wahrnehmung -> {{ character.baseStats.preception.current }} / {{ character.baseStats.preception.default }} <br>
      Charisma -> {{ character.baseStats.charisma.current }} / {{ character.baseStats.charisma.default }} <br>
      Wille -> {{ character.baseStats.will.current }} / {{ character.baseStats.will.default }} <br>
      Verbundenheit -> {{ character.baseStats.connection.current }} / {{ character.baseStats.connection.default }} <br>
      <!-- Motivation -> {{ character.baseStats.motivation.current }} / {{ character.baseStats.motivation.default }} <br> -->
      <!-- Leben x Kraft -> {{ character.baseStats.lsx }} <br>
      Kraft x Akrobatik -> {{ character.baseStats.sax }} <br>
      Akrobatik x Wahrnehmung -> {{ character.baseStats.apx }} <br>
      Wahrnehmung x Charisma -> {{ character.baseStats.pcx }} <br>
      Charisma x Wille -> {{ character.baseStats.cwx }} <br>
      Wille x Verbundenheit -> {{ character.baseStats.wcx }} <br> -->
      <br>
      XP -> {{ character.xp }} <br>
    </p>
    <div style="margin-top: 40px; display: flex; flex-direction: column; gap: 8px;">
      <h2>Modifikator Hinzufügen</h2>
      <div>
        <input type="checkbox" id="1" v-model="passive">
        <label for="1">Passiv</label>
      </div>
      <div>
        <input type="checkbox" id="2" v-model="active">
        <label for="2">Aktiv</label>
      </div>
      <label for="3">Beschreibung</label>
      <input type="text" id="3" style="background-color: gray;" v-model="description">
      <label for="4">Modus</label>
      <input type="text" id="4" style="background-color: gray;" v-model="mode">
      <label for="5">Wert</label>
      <input type="number" id="5" style="background-color: gray;" v-model="value">
      <label for="6">Ziel</label>
      <input type="text" id="6" style="background-color: gray;" v-model="target">
      <button @click="applyModifier()">Anwenden</button>
      <button @click="addClass()">Alter Sack Stufe 1 anwenden</button>
    </div>
    <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px;">
      <h2>Passive Modifikatoren</h2>
      <div v-for="modifier in character.modifiers" :key="modifier.id">
        <p>{{ modifier.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Character from '@/functional_components/nirve/nirve_character_v3/Character';
  import { ICharacterClassBase } from '@/functional_components/nirve/nirve_character_v3/CharacterClass';
  import { IModifier } from '@/functional_components/nirve/nirve_character_v3/Modifier';
  import { IRequirement } from '@/functional_components/nirve/nirve_character_v3/Requirement';
  import { v4 } from 'uuid';
  import { Ref, reactive } from 'vue';
  import { ref } from 'vue';

  const character = reactive(new Character());
  let passive: Ref<boolean> = ref(false);
  let active: Ref<boolean> = ref(false);
  let description: Ref<string> = ref('');
  let mode: Ref<string> = ref('');
  let value: Ref<number> = ref(0);
  let target: Ref<string> = ref('');

  function addClass() {
    character.addClass(<ICharacterClassBase>{
      id: v4(),
      name: "Old Man",
      level: 1,
      baseCost: 25,
      levelCost: 15,
      choices: [0],
      options: [
        [
          <IModifier>{
            id: 'test2',
            description: "Old Man Level 1",
            mode: "+",
            value: 50,
            passive: true,
            active: false,
            target: "age"
          }
        ]
      ],
      requirements: [
        <IRequirement>{
          target: "level",
          mode: ">=",
          value: 1,
          description: "test requirement"
        }
      ]
    });
  }

  function applyModifier() {
    let modifier: IModifier = {
      id: v4(),
      passive: passive.value,
      active: active.value,
      description: description.value,
      mode: mode.value as 'add'|'remove'|'+'|'-'|'*'|'/'|'=',
      value: value.value,
      target: target.value,
    };
    character.addModifier(modifier);
    character.applyModifier(character.modifiers.length - 1);
  }
    
    const heroSections = ref([
    {
      title: 'Was ist Soulforger?',
      content: 'Soulforger ist eine digitale Plattform, die darauf abzielt, die Komplexität von Rollenspielen zu verringern. Sie unterstützt mehrere Regelwerke mit dem gleichen Funktionsumfang für jedes einzelne.',
    },
    {
      title: 'Was ist Soulforger?',
      content: 'Soulforger ist eine digitale Plattform, die darauf abzielt, die Komplexität von Rollenspielen zu verringern. Sie unterstützt mehrere Regelwerke mit dem gleichen Funktionsumfang für jedes einzelne.',
    },
    {
      title: 'Was ist Soulforger?',
      content: 'Soulforger ist eine digitale Plattform, die darauf abzielt, die Komplexität von Rollenspielen zu verringern. Sie unterstützt mehrere Regelwerke mit dem gleichen Funktionsumfang für jedes einzelne.',
    },
  ]);

  const rulebooks = ref([
    {
      title: 'Das Schwarze Auge 5',
      description: 'Das Schwarze Auge entführt dich in eine fantastische Welt voller Mythen und Legenden. Tauche ein in das Abenteuer und erkunde die dunklen Wälder, uralten Ruinen und pulsierenden Städte Aventuriens. Werde zum tapferen Helden, meistere gefährliche Prüfungen und enthülle die Geheimnisse einer reichhaltigen Geschichte. In DSA findest du ein umfangreiches Regelwerk, das es dir ermöglicht, einzigartige Charaktere zu erschaffen und unvergessliche Geschichten zu erleben. Sei bereit, dich den Herausforderungen zu stellen und deine eigene Legende zu schreiben!',
      img: '/dsa_background1.jpg',
      tags:['Low Fantasy', 'Mittelalter', 'Magie', 'Götter']
    },
    {
      title: 'Nirve',
      description: 'In Nirvé schreibst du die Sagen hinter den Legenden. Seit dem Ende der Verwüstung liegt die Welt allein in den Händen der Humaner. Religionen kämpfen um die Wahrheit, Reiche um Vorherrschaft. Jahrhunderte der Geschichte sind bereit, von dir und deinen Weggefährten erlebt zu werden...',
      img: '/nirve_background1.jpg',
      tags:['High Fantasy', 'Mittelalter', 'Magie', 'Götter']
    },
    {
      title: 'Shadowrun 6',
      description: 'Tauche ein in die düstere Zukunft von Shadowrun, einer Welt, in der Megakonzerne die Regeln bestimmen und Magie mit Hightech verschmilzt. Als Shadowrunner navigierst du durch die neonbeleuchteten Straßen einer cyberpunkesken Metropole und stellst dich gefährlichen Aufträgen, in denen Magie, Technologie und Intrigen aufeinandertreffen. Bist du bereit, deine Fähigkeiten zu nutzen und dich in diesem dystopischen Universum zu behaupten?',
      img: '/shadowrun_background1.jpg',
      tags:['High Fantasy', 'Cyberpunk', 'Magie', 'Dystopie']
    },
    {
      title: 'Cyberpunk Red',
      description: 'Willkommen in der rauen und futuristischen Welt von Cyberpunk. Hier verschmilzt Technologie mit der Dunkelheit der Nacht, während du dich als Street Samurai oder Netrunner in den Straßen einer dystopischen Metropole behauptest. Spüre den Puls der Cyberpunk-Ära, in der jeder Augenblick dein letzter sein könnte. Bist du bereit, dich dem Kampf gegen die Mächte der Konzerne anzuschließen und deine eigene Legende zu schreiben?',
      img: '/cyberpunk_background1.jpg',
      tags:['High Fantasy', 'Cyberpunk', 'Dystopie']
    },
    {
      title: 'Fading Suns',
      description: 'Tauche ein in die faszinierende Welt von Fading Suns, einem düsteren Science-Fiction-Universum, in dem das Licht des Sternenimperiums langsam verblasst. Als Teil eines interstellaren Reiches erlebst du politische Intrigen, mystische Geheimnisse und gefährliche Missionen in einer Zeit des Niedergangs und der Hoffnung. Bist du bereit, dich den Herausforderungen dieser kosmischen Saga zu stellen und deine Bestimmung zu erfüllen?',
      img: '/fadingsuns_background1.jpg',
      tags:['High Fantasy', 'Low Fantasy', 'Mittelalter', 'Sci-Fi', 'Aliens', 'Distopie']
    }
  ])

</script>
