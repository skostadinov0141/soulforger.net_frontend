<template>
    <div>
        <button @click="char.increaseStat('MU')">add MU</button>
        <button @click="char.increaseStat('KL')">add KL</button>
        <button @click="char.increaseStat('IN')">add IN</button>
        <button @click="char.increaseStat('CH')">add CH</button>
        <button @click="char.increaseStat('FF')">add FF</button>
        <button @click="char.increaseStat('GE')">add GE</button>
        <button @click="char.increaseStat('KO')">add KO</button>
        <button @click="char.increaseStat('KK')">add KK</button>
        <button @click="char.testValidate()">Test Validate</button>
        <p v-for="sub_stat in char.sub_stats">{{ `${sub_stat.full_name} -> ${sub_stat.value}` }}</p>
        <br><br><br>
        <p v-for="stat in char.stats">{{ `${stat.full_name} -> ${stat.lvl}` }}</p>
        <br><br><br>
        <p v-for="talent in char.talents">{{ `${talent.id} -> ${talent.fw}` }}</p>
    </div>
</template>

<script setup lang="ts">
import { Character } from '@/frameworks/character_creation/c_character';
import type { SkillLevel } from '@/frameworks/character_creation/i_skill_level';
import { onMounted, reactive, ref, type Ref } from 'vue';

const skill_level: SkillLevel = {
    name: 'Durchschnittlich',
    ap_base: 1000,
    stat_max_level: 13,
    talent_max: 10,
    combat_talent_max: 10,
    stat_points_total: 98,
    spells_lit_max: 10,
    spells_non_traditional: 1,
}
let charClass = new Character(skill_level);
const char = ref(reactive(charClass));

// const char: Character = new Character(skill_level);
</script>

<style scoped>

</style>