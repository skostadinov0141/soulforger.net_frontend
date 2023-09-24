<script setup lang="ts">
import TestKlasse from '@/functional_components/TestKlasse';
import { text } from 'stream/consumers';
import { ComputedRef, computed, reactive } from 'vue';
import { watch } from 'vue';
import { Ref, ref } from 'vue';

	const testObjekt = reactive(new TestKlasse());

</script>




<template>
	<div class="input-container">
		<input 
			type="number" 
			name="" 
			id="val1"
			v-model="testObjekt.value1"/>
		<input 
			type="number" 
			name="" 
			id="val2"
			v-model="testObjekt.value2"/>
		<button class="calc-button" @click="testObjekt.AddNumbers()">
			Add
		</button>
		<button class="calc-button" @click="testObjekt.SubtractNumbers()">
			Sub
		</button>
		<button class="calc-button" @click="testObjekt.MultiplyNumbers()">
			Mul
		</button>
		<button class="calc-button" @click="testObjekt.DivideNumbers()">
			Div
		</button>
		<p>
			{{ testObjekt.result }}
		</p>
	</div>
</template>




<style scoped>
	input{
		background-color: white;
		color: black;
	}
	.red{
		color: red;
	}
	.green{
		color: green;
	}
	.input-container{
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 20%;
	}
	.calc-button{
		background-color: orange;
		color: aquamarine;
	}
</style>